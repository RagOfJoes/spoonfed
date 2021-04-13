package s3

import (
	"errors"
	"strings"
	"time"

	"github.com/RagOfJoes/spoonfed-go/pkg/logger"
	awsS3 "github.com/aws/aws-sdk-go/service/s3"
)

// MaxSize for file uploads.
// Currently: 10mb
const MaxSize = 10 * 1024 * 1024

var (
	acceptedFolders   = []string{"recipes"}
	acceptedFileTypes = []string{"image/png", "image/jpeg"}
)

// New builds a new S3 object
func New(service *awsS3.S3, bucket string) (*S3, error) {
	if service == nil {
		return nil, errors.New("must provide a valid S3 Service")
	}
	if bucket == "" {
		return nil, errors.New("must provide valid S3 bucket")
	}
	return &S3{service: service, Bucket: bucket}, nil
}

// PresignPut generates presign url
func (s *S3) PresignPut(filename string, filetype string, filesize int64) (*PresignResponse, *PresignError) {
	hasValidFileName := false
	hasValidFileType := false
	// 1. Validate Filesize
	// TODO: Probably don't need this
	// since we're already checking if the entire
	// files provided exceeds max size
	if filesize > MaxSize {
		return nil, &PresignError{
			Code:    ErrorCodeFileExceedsMaxSize,
			Message: "`filesize` must not exceed 10mb",
		}
	}
	// 2. Validate Filetype
	for _, t := range acceptedFileTypes {
		if t == filetype {
			hasValidFileType = true
			break
		}
	}
	if !hasValidFileType {
		message := "invalid `filetype` provided. accepted file types are: " + strings.Join(acceptedFileTypes, ", ")
		return nil, &PresignError{
			Code:    ErrorCodeInvalidInput,
			Message: message,
		}
	}
	// 3. Validate Filename
	split := strings.Split(filename, "/")
	if len(split) != 2 {
		return nil, &PresignError{
			Code:    ErrorCodeInvalidInput,
			Message: "invalid `filename` provided. make sure to include proper folder. ie: `recipes/brownie`",
		}
	}
	for _, n := range acceptedFolders {
		if split[0] == n {
			hasValidFileName = true
			break
		}
	}
	if !hasValidFileName {
		message := "invalid `filename` provided. accepted folder names are: " + strings.Join(acceptedFolders, ", ")
		return nil, &PresignError{
			Code:    ErrorCodeInvalidInput,
			Message: message,
		}
	}
	// 4. Build request
	acl := "public-read"
	minuteFromNow := time.Now().Add(time.Minute)
	req, _ := s.service.PutObjectRequest(&awsS3.PutObjectInput{
		ACL:     &acl,
		Key:     &filename,
		Bucket:  &s.Bucket,
		Expires: &minuteFromNow,
	})
	if err := req.Error; err != nil {
		// TODO: Add Error tracer here
		logger.Error("[S3] Failed to create PUT request. Error: ", err.Error())
		return nil, &PresignError{
			Code:    ErrorCodePresignBuildFailed,
			Message: "failed to build presign url. please try again later.",
		}
	}
	url, headers, err := req.PresignRequest(time.Minute)
	if err != nil {
		// TODO: Add Error tracer here
		logger.Error("[S3] Failed to build presign url. Error: ", err)
		return nil, &PresignError{
			Code:    ErrorCodePresignBuildFailed,
			Message: "failed to build presign url. please try again later.",
		}
	}
	return &PresignResponse{
		URL:    url,
		Method: "PUT",
		Header: headers,
	}, nil
}
