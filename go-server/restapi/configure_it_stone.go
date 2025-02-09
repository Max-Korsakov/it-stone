// This file is safe to edit. Once it exists it will not be overwritten

package restapi

import (
	"crypto/tls"
	"it-stone-server/adapters"
	handlers "it-stone-server/adapters/rest-api-handlers"
	"net/http"

	errors "github.com/go-openapi/errors"
	runtime "github.com/go-openapi/runtime"
	middleware "github.com/go-openapi/runtime/middleware"

	"it-stone-server/restapi/operations"
	"it-stone-server/restapi/operations/card"
	"it-stone-server/restapi/operations/login"
	"it-stone-server/restapi/operations/registration"
	"it-stone-server/restapi/operations/user"

	models "it-stone-server/models"
)

//go:generate swagger generate server --target ..\..\go-server --name ItStone --spec ..\swagger.yml --principal models.Principal

func configureFlags(api *operations.ItStoneAPI) {
	// api.CommandLineOptionsGroups = []swag.CommandLineOptionsGroup{ ... }
}

func configureAPI(api *operations.ItStoneAPI) http.Handler {
	// configure the api here
	api.ServeError = errors.ServeError

	// Set your custom logger if needed. Default one is log.Printf
	// Expected interface func(string, ...interface{})
	//
	// Example:
	// api.Logger = log.Printf

	api.JSONConsumer = runtime.JSONConsumer()

	api.JSONProducer = runtime.JSONProducer()

	authHandler := handlers.NewAuthHandler()
	cardHandler := handlers.NewCardsHandler()
	userHandler := handlers.NewUsersHandler()
	restApiHandler := adapters.NewRestAPIHandler(authHandler, cardHandler, userHandler)
	restApiHandler.ConfigureRestAPI(api)

	if api.UserDeleteUserHandler == nil {
		api.UserDeleteUserHandler = user.DeleteUserHandlerFunc(func(params user.DeleteUserParams, principal *models.Principal) middleware.Responder {
			return middleware.NotImplemented("operation user.DeleteUser has not yet been implemented")
		})
	}

	if api.UserGetUserHandler == nil {
		api.UserGetUserHandler = user.GetUserHandlerFunc(func(params user.GetUserParams, principal *models.Principal) middleware.Responder {
			return middleware.NotImplemented("operation user.GetUser has not yet been implemented")
		})
	}
	if api.UserGetUsersHandler == nil {
		api.UserGetUsersHandler = user.GetUsersHandlerFunc(func(params user.GetUsersParams, principal *models.Principal) middleware.Responder {
			return middleware.NotImplemented("operation user.GetUsers has not yet been implemented")
		})
	}
	if api.LoginLoginHandler == nil {
		api.LoginLoginHandler = login.LoginHandlerFunc(func(params login.LoginParams) middleware.Responder {
			return middleware.NotImplemented("operation login.Login has not yet been implemented")
		})
	}
	if api.RegistrationRegistrationHandler == nil {
		api.RegistrationRegistrationHandler = registration.RegistrationHandlerFunc(func(params registration.RegistrationParams) middleware.Responder {
			return middleware.NotImplemented("operation registration.Registration has not yet been implemented")
		})
	}
	if api.CardUpdateCardHandler == nil {
		api.CardUpdateCardHandler = card.UpdateCardHandlerFunc(func(params card.UpdateCardParams, principal *models.Principal) middleware.Responder {
			return middleware.NotImplemented("operation card.UpdateCard has not yet been implemented")
		})
	}
	if api.UserUpdateUserHandler == nil {
		api.UserUpdateUserHandler = user.UpdateUserHandlerFunc(func(params user.UpdateUserParams, principal *models.Principal) middleware.Responder {
			return middleware.NotImplemented("operation user.UpdateUser has not yet been implemented")
		})
	}
	if api.UserGetUserByTokenHandler == nil {
		api.UserGetUserByTokenHandler = user.GetUserByTokenHandlerFunc(func(params user.GetUserByTokenParams, principal *models.Principal) middleware.Responder {
			return middleware.NotImplemented("operation user.UpdateUser has not yet been implemented")
		})
	}
	api.ServerShutdown = func() {}

	return setupGlobalMiddleware(api.Serve(setupMiddlewares))
}

// The TLS configuration before HTTPS server starts.
func configureTLS(tlsConfig *tls.Config) {
	// Make all necessary changes to the TLS configuration here.
}

// As soon as server is initialized but not run yet, this function will be called.
// If you need to modify a config, store server instance to stop it individually later, this is the place.
// This function can be called multiple times, depending on the number of serving schemes.
// scheme value will be set accordingly: "http", "https" or "unix"
func configureServer(s *http.Server, scheme, addr string) {
}

// The middleware configuration is for the handler executors. These do not apply to the swagger.json document.
// The middleware executes after routing but before authentication, binding and validation
func setupMiddlewares(handler http.Handler) http.Handler {
	return handler
}

// The middleware configuration happens before anything, this middleware also applies to serving the swagger.json document.
// So this is a good place to plug in a panic handling middleware, logging and metrics
func setupGlobalMiddleware(handler http.Handler) http.Handler {
	return handler
}
