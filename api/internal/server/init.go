package server

import (
	"errors"

	"github.com/RagOfJoes/spoonfed-go/internal/orm"
	"github.com/RagOfJoes/spoonfed-go/internal/s3"
	"github.com/RagOfJoes/spoonfed-go/pkg/auth"
	"github.com/RagOfJoes/spoonfed-go/pkg/util"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	awsS3 "github.com/aws/aws-sdk-go/service/s3"
)

// InitializeORM initiaalizes the ORM singleton object
func InitializeORM(cfg *util.ServerConfig) (*orm.ORM, error) {
	return orm.New(cfg)
}

// InitializeOpenIDClient does exactly as the name suggests
func InitializeOpenIDClient(cfg *util.ServerConfig) (*auth.OpenIDClient, error) {
	scope := cfg.Auth.Scopes
	clientID := cfg.Auth.ClientID
	clientSecret := cfg.Auth.ClientSecret
	openIDAutoDiscoveryURL := cfg.Auth.Issuer + "/.well-known/openid-configuration"
	client, err := auth.New(clientID, clientSecret, openIDAutoDiscoveryURL, scope)
	if err != nil {
		return nil, err
	}
	return client, nil
}

// InitializeS3 does exactly as the name suggests
func InitializeS3(cfg *util.ServerConfig) (*s3.S3, error) {
	sess := session.Must(session.NewSession())
	if sess == nil {
		return nil, errors.New("[S3] Failed to load required config")
	}
	s3Svc := awsS3.New(sess, &aws.Config{
		Region: &cfg.S3.Region,
	})
	if s3Svc == nil {
		return nil, errors.New("[S3] Bucket and region provided are invalid")
	}
	sn, err := s3.New(s3Svc, cfg.S3.Bucket)
	if err != nil {
		return nil, err
	}
	return sn, nil
}
