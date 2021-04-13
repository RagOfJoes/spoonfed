package server

import (
	"github.com/RagOfJoes/spoonfed-go/internal/orm"
	"github.com/RagOfJoes/spoonfed-go/internal/s3"
	"github.com/RagOfJoes/spoonfed-go/internal/server/routes"
	"github.com/RagOfJoes/spoonfed-go/pkg/util"
	"github.com/gin-gonic/gin"
)

// AttachRoutes attaches routes to gin router
func AttachRoutes(cfg *util.ServerConfig, router *gin.Engine, orm *orm.ORM, s *s3.S3) error {
	if err := routes.GraphQL(cfg, router, orm); err != nil {
		return err
	}
	if err := routes.S3(cfg, router, s); err != nil {
		return err
	}
	return nil
}
