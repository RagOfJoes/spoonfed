package handlers

import (
	"fmt"
	"net/http"

	"github.com/RagOfJoes/spoonfed-go/internal/s3"
	"github.com/RagOfJoes/spoonfed-go/pkg/util"
	"github.com/gin-gonic/gin"
)

// S3PutHandler defines custom handler for PUT route
func S3PutHandler(cfg *util.ServerConfig, s *s3.S3) gin.HandlerFunc {
	return func(c *gin.Context) {
		b := &s3.PresignBodyPut{}
		err := c.ShouldBind(b)
		// 1. Validate files
		if err != nil || len(b.Files) < 1 {
			c.JSON(http.StatusBadRequest, s3.PresignError{
				Code:    s3.ErrorCodeInvalidInput,
				Message: "must provide `files` in body",
			})
			return
		}
		var bodySize int64
		for _, file := range b.Files {
			bodySize += file.Filesize
		}
		if bodySize > s3.MaxSize {
			c.JSON(http.StatusBadRequest, s3.PresignError{
				Code:    s3.ErrorCodeFilesExceedsMaxSize,
				Message: "files must not exceed 10mb",
			})
			return
		}
		// 2. Loop through files to validate then
		// generate presign urls
		errs := []s3.PresignError{}
		res := []s3.PresignResponse{}
		for _, file := range b.Files {
			r, e := s.PresignPut(file.Filename, file.Filetype, file.Filesize)
			if e != nil {
				e.Message = fmt.Sprintf("%s: %s", file.Filename, e.Message)
				errs = append(errs, *e)
				continue
			}
			if r == nil {
				errs = append(errs, s3.PresignError{
					Code:    s3.ErrorCodeInvalidInput,
					Message: fmt.Sprintf("%s: Invalid file provided", file.Filename),
				})
				continue
			}
			res = append(res, *r)
		}
		// 3. Respond back to client
		if len(errs) > 0 {
			c.JSON(http.StatusBadRequest, errs)
			return
		}
		if len(res) > 0 {
			c.JSON(http.StatusOK, res)
			return
		}
		c.JSON(http.StatusInternalServerError, s3.PresignError{
			Code:    s3.ErrorCodePresignBuildFailed,
			Message: "failed to generate presign url(s). please try again later.",
		})
	}
}
