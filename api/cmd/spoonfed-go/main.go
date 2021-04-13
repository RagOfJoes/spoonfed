package main

import (
	"github.com/RagOfJoes/spoonfed-go/configs"
	"github.com/RagOfJoes/spoonfed-go/internal/server"
	"github.com/RagOfJoes/spoonfed-go/pkg/logger"
)

func main() {
	cfg := configs.LoadServerConfig()
	err := server.Run(cfg)
	if err != nil {
		logger.Panic(err)
	}
}
