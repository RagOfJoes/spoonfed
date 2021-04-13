package s3

import (
	"net/http"

	awsS3 "github.com/aws/aws-sdk-go/service/s3"
)

// ErrorCode defines a custom code
// for responses
type ErrorCode string

// S3 defines the exposed S3 service
type S3 struct {
	service *awsS3.S3
	Bucket  string
}

// PresignError defines the custom
// error
type PresignError struct {
	Code    ErrorCode `json:"code"`
	Message string    `json:"message"`
}

// PresignResponse defines the custom
// response
type PresignResponse struct {
	URL    string      `json:"url"`
	Method string      `json:"method"`
	Header http.Header `json:"header"`
}

// PresignFile defines the file input
type PresignFile struct {
	Filename string `json:"filename" binding:"required"`
	Filetype string `json:"filetype" binding:"required"`
	Filesize int64  `json:"filesize" binding:"required"`
}

// PresignBodyPut defines the required
// body structure for PUT requests
type PresignBodyPut struct {
	Files []PresignFile `json:"files" binding:"required"`
}
