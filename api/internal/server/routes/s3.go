package routes

import (
	"errors"

	"github.com/RagOfJoes/spoonfed-go/internal/s3"
	"github.com/RagOfJoes/spoonfed-go/internal/server/handlers"
	"github.com/RagOfJoes/spoonfed-go/pkg/logger"
	"github.com/RagOfJoes/spoonfed-go/pkg/util"
	"github.com/gin-gonic/gin"
)

// S3 setups S3 routes
// TODO: Add Auth middleware and additional security in production
// to ensure that this isn't too exposed
func S3(cfg *util.ServerConfig, r *gin.Engine, s *s3.S3) error {
	presignPath := cfg.S3.PresignPath
	if len(presignPath) == 0 {
		return errors.New("[S3] invalid presign path provided")
	}
	r.PUT(presignPath, handlers.S3PutHandler(cfg, s))
	logger.Infof("[S3] mounted at %s", presignPath)
	return nil
}
