package util

import "reflect"

// ProjectContextKeys are valid project context keys
var ProjectContextKeys = ContextKeys{
	User:       "sf-user",
	Provider:   "sf-auth-provider",
	Dataloader: "sf-dataloaders",
}

// String converts ContextKey type to string to
// allow for consumption
func (c *ContextKey) String() string {
	return reflect.ValueOf(c).String()
}
