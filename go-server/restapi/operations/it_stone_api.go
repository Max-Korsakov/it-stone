// Code generated by go-swagger; DO NOT EDIT.

package operations

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"fmt"
	"net/http"
	"strings"

	errors "github.com/go-openapi/errors"
	loads "github.com/go-openapi/loads"
	runtime "github.com/go-openapi/runtime"
	middleware "github.com/go-openapi/runtime/middleware"
	security "github.com/go-openapi/runtime/security"
	spec "github.com/go-openapi/spec"
	strfmt "github.com/go-openapi/strfmt"
	"github.com/go-openapi/swag"

	"it-stone-server/restapi/operations/card"
	"it-stone-server/restapi/operations/login"
	"it-stone-server/restapi/operations/registration"
	"it-stone-server/restapi/operations/user"

	models "it-stone-server/models"
)

// NewItStoneAPI creates a new ItStone instance
func NewItStoneAPI(spec *loads.Document) *ItStoneAPI {
	return &ItStoneAPI{
		handlers:            make(map[string]map[string]http.Handler),
		formats:             strfmt.Default,
		defaultConsumes:     "application/json",
		defaultProduces:     "application/json",
		customConsumers:     make(map[string]runtime.Consumer),
		customProducers:     make(map[string]runtime.Producer),
		ServerShutdown:      func() {},
		spec:                spec,
		ServeError:          errors.ServeError,
		BasicAuthenticator:  security.BasicAuth,
		APIKeyAuthenticator: security.APIKeyAuth,
		BearerAuthenticator: security.BearerAuth,
		JSONConsumer:        runtime.JSONConsumer(),
		JSONProducer:        runtime.JSONProducer(),
		CardCreateCardHandler: card.CreateCardHandlerFunc(func(params card.CreateCardParams, principal *models.Principal) middleware.Responder {
			return middleware.NotImplemented("operation CardCreateCard has not yet been implemented")
		}),
		CardDeleteCardHandler: card.DeleteCardHandlerFunc(func(params card.DeleteCardParams, principal *models.Principal) middleware.Responder {
			return middleware.NotImplemented("operation CardDeleteCard has not yet been implemented")
		}),
		UserDeleteUserHandler: user.DeleteUserHandlerFunc(func(params user.DeleteUserParams, principal *models.Principal) middleware.Responder {
			return middleware.NotImplemented("operation UserDeleteUser has not yet been implemented")
		}),
		CardGetCardHandler: card.GetCardHandlerFunc(func(params card.GetCardParams, principal *models.Principal) middleware.Responder {
			return middleware.NotImplemented("operation CardGetCard has not yet been implemented")
		}),
		CardGetCardsHandler: card.GetCardsHandlerFunc(func(params card.GetCardsParams, principal *models.Principal) middleware.Responder {
			return middleware.NotImplemented("operation CardGetCards has not yet been implemented")
		}),
		UserGetUserHandler: user.GetUserHandlerFunc(func(params user.GetUserParams, principal *models.Principal) middleware.Responder {
			return middleware.NotImplemented("operation UserGetUser has not yet been implemented")
		}),
		UserGetUserByTokenHandler: user.GetUserByTokenHandlerFunc(func(params user.GetUserByTokenParams, principal *models.Principal) middleware.Responder {
			return middleware.NotImplemented("operation UserGetUserByToken has not yet been implemented")
		}),
		UserGetUsersHandler: user.GetUsersHandlerFunc(func(params user.GetUsersParams, principal *models.Principal) middleware.Responder {
			return middleware.NotImplemented("operation UserGetUsers has not yet been implemented")
		}),
		LoginLoginHandler: login.LoginHandlerFunc(func(params login.LoginParams) middleware.Responder {
			return middleware.NotImplemented("operation LoginLogin has not yet been implemented")
		}),
		RegistrationRegistrationHandler: registration.RegistrationHandlerFunc(func(params registration.RegistrationParams) middleware.Responder {
			return middleware.NotImplemented("operation RegistrationRegistration has not yet been implemented")
		}),
		CardUpdateCardHandler: card.UpdateCardHandlerFunc(func(params card.UpdateCardParams, principal *models.Principal) middleware.Responder {
			return middleware.NotImplemented("operation CardUpdateCard has not yet been implemented")
		}),
		UserUpdateUserHandler: user.UpdateUserHandlerFunc(func(params user.UpdateUserParams, principal *models.Principal) middleware.Responder {
			return middleware.NotImplemented("operation UserUpdateUser has not yet been implemented")
		}),

		// Applies when the "JWT-Token" header is set
		APIKeyHeaderAuth: func(token string) (*models.Principal, error) {
			return nil, errors.NotImplemented("api key auth (APIKeyHeader) JWT-Token from header param [JWT-Token] has not yet been implemented")
		},

		// default authorizer is authorized meaning no requests are blocked
		APIAuthorizer: security.Authorized(),
	}
}

/*ItStoneAPI Description for API Server */
type ItStoneAPI struct {
	spec            *loads.Document
	context         *middleware.Context
	handlers        map[string]map[string]http.Handler
	formats         strfmt.Registry
	customConsumers map[string]runtime.Consumer
	customProducers map[string]runtime.Producer
	defaultConsumes string
	defaultProduces string
	Middleware      func(middleware.Builder) http.Handler

	// BasicAuthenticator generates a runtime.Authenticator from the supplied basic auth function.
	// It has a default implementation in the security package, however you can replace it for your particular usage.
	BasicAuthenticator func(security.UserPassAuthentication) runtime.Authenticator
	// APIKeyAuthenticator generates a runtime.Authenticator from the supplied token auth function.
	// It has a default implementation in the security package, however you can replace it for your particular usage.
	APIKeyAuthenticator func(string, string, security.TokenAuthentication) runtime.Authenticator
	// BearerAuthenticator generates a runtime.Authenticator from the supplied bearer token auth function.
	// It has a default implementation in the security package, however you can replace it for your particular usage.
	BearerAuthenticator func(string, security.ScopedTokenAuthentication) runtime.Authenticator

	// JSONConsumer registers a consumer for a "application/json" mime type
	JSONConsumer runtime.Consumer

	// JSONProducer registers a producer for a "application/json" mime type
	JSONProducer runtime.Producer

	// APIKeyHeaderAuth registers a function that takes a token and returns a principal
	// it performs authentication based on an api key JWT-Token provided in the header
	APIKeyHeaderAuth func(string) (*models.Principal, error)

	// APIAuthorizer provides access control (ACL/RBAC/ABAC) by providing access to the request and authenticated principal
	APIAuthorizer runtime.Authorizer

	// CardCreateCardHandler sets the operation handler for the create card operation
	CardCreateCardHandler card.CreateCardHandler
	// CardDeleteCardHandler sets the operation handler for the delete card operation
	CardDeleteCardHandler card.DeleteCardHandler
	// UserDeleteUserHandler sets the operation handler for the delete user operation
	UserDeleteUserHandler user.DeleteUserHandler
	// CardGetCardHandler sets the operation handler for the get card operation
	CardGetCardHandler card.GetCardHandler
	// CardGetCardsHandler sets the operation handler for the get cards operation
	CardGetCardsHandler card.GetCardsHandler
	// UserGetUserHandler sets the operation handler for the get user operation
	UserGetUserHandler user.GetUserHandler
	// UserGetUserByTokenHandler sets the operation handler for the get user by token operation
	UserGetUserByTokenHandler user.GetUserByTokenHandler
	// UserGetUsersHandler sets the operation handler for the get users operation
	UserGetUsersHandler user.GetUsersHandler
	// LoginLoginHandler sets the operation handler for the login operation
	LoginLoginHandler login.LoginHandler
	// RegistrationRegistrationHandler sets the operation handler for the registration operation
	RegistrationRegistrationHandler registration.RegistrationHandler
	// CardUpdateCardHandler sets the operation handler for the update card operation
	CardUpdateCardHandler card.UpdateCardHandler
	// UserUpdateUserHandler sets the operation handler for the update user operation
	UserUpdateUserHandler user.UpdateUserHandler

	// ServeError is called when an error is received, there is a default handler
	// but you can set your own with this
	ServeError func(http.ResponseWriter, *http.Request, error)

	// ServerShutdown is called when the HTTP(S) server is shut down and done
	// handling all active connections and does not accept connections any more
	ServerShutdown func()

	// Custom command line argument groups with their descriptions
	CommandLineOptionsGroups []swag.CommandLineOptionsGroup

	// User defined logger function.
	Logger func(string, ...interface{})
}

// SetDefaultProduces sets the default produces media type
func (o *ItStoneAPI) SetDefaultProduces(mediaType string) {
	o.defaultProduces = mediaType
}

// SetDefaultConsumes returns the default consumes media type
func (o *ItStoneAPI) SetDefaultConsumes(mediaType string) {
	o.defaultConsumes = mediaType
}

// SetSpec sets a spec that will be served for the clients.
func (o *ItStoneAPI) SetSpec(spec *loads.Document) {
	o.spec = spec
}

// DefaultProduces returns the default produces media type
func (o *ItStoneAPI) DefaultProduces() string {
	return o.defaultProduces
}

// DefaultConsumes returns the default consumes media type
func (o *ItStoneAPI) DefaultConsumes() string {
	return o.defaultConsumes
}

// Formats returns the registered string formats
func (o *ItStoneAPI) Formats() strfmt.Registry {
	return o.formats
}

// RegisterFormat registers a custom format validator
func (o *ItStoneAPI) RegisterFormat(name string, format strfmt.Format, validator strfmt.Validator) {
	o.formats.Add(name, format, validator)
}

// Validate validates the registrations in the ItStoneAPI
func (o *ItStoneAPI) Validate() error {
	var unregistered []string

	if o.JSONConsumer == nil {
		unregistered = append(unregistered, "JSONConsumer")
	}

	if o.JSONProducer == nil {
		unregistered = append(unregistered, "JSONProducer")
	}

	if o.APIKeyHeaderAuth == nil {
		unregistered = append(unregistered, "JWTTokenAuth")
	}

	if o.CardCreateCardHandler == nil {
		unregistered = append(unregistered, "card.CreateCardHandler")
	}

	if o.CardDeleteCardHandler == nil {
		unregistered = append(unregistered, "card.DeleteCardHandler")
	}

	if o.UserDeleteUserHandler == nil {
		unregistered = append(unregistered, "user.DeleteUserHandler")
	}

	if o.CardGetCardHandler == nil {
		unregistered = append(unregistered, "card.GetCardHandler")
	}

	if o.CardGetCardsHandler == nil {
		unregistered = append(unregistered, "card.GetCardsHandler")
	}

	if o.UserGetUserHandler == nil {
		unregistered = append(unregistered, "user.GetUserHandler")
	}

	if o.UserGetUserByTokenHandler == nil {
		unregistered = append(unregistered, "user.GetUserByTokenHandler")
	}

	if o.UserGetUsersHandler == nil {
		unregistered = append(unregistered, "user.GetUsersHandler")
	}

	if o.LoginLoginHandler == nil {
		unregistered = append(unregistered, "login.LoginHandler")
	}

	if o.RegistrationRegistrationHandler == nil {
		unregistered = append(unregistered, "registration.RegistrationHandler")
	}

	if o.CardUpdateCardHandler == nil {
		unregistered = append(unregistered, "card.UpdateCardHandler")
	}

	if o.UserUpdateUserHandler == nil {
		unregistered = append(unregistered, "user.UpdateUserHandler")
	}

	if len(unregistered) > 0 {
		return fmt.Errorf("missing registration: %s", strings.Join(unregistered, ", "))
	}

	return nil
}

// ServeErrorFor gets a error handler for a given operation id
func (o *ItStoneAPI) ServeErrorFor(operationID string) func(http.ResponseWriter, *http.Request, error) {
	return o.ServeError
}

// AuthenticatorsFor gets the authenticators for the specified security schemes
func (o *ItStoneAPI) AuthenticatorsFor(schemes map[string]spec.SecurityScheme) map[string]runtime.Authenticator {

	result := make(map[string]runtime.Authenticator)
	for name := range schemes {
		switch name {

		case "APIKeyHeader":

			scheme := schemes[name]
			result[name] = o.APIKeyAuthenticator(scheme.Name, scheme.In, func(token string) (interface{}, error) {
				return o.APIKeyHeaderAuth(token)
			})

		}
	}
	return result

}

// Authorizer returns the registered authorizer
func (o *ItStoneAPI) Authorizer() runtime.Authorizer {

	return o.APIAuthorizer

}

// ConsumersFor gets the consumers for the specified media types
func (o *ItStoneAPI) ConsumersFor(mediaTypes []string) map[string]runtime.Consumer {

	result := make(map[string]runtime.Consumer)
	for _, mt := range mediaTypes {
		switch mt {

		case "application/json":
			result["application/json"] = o.JSONConsumer

		}

		if c, ok := o.customConsumers[mt]; ok {
			result[mt] = c
		}
	}
	return result

}

// ProducersFor gets the producers for the specified media types
func (o *ItStoneAPI) ProducersFor(mediaTypes []string) map[string]runtime.Producer {

	result := make(map[string]runtime.Producer)
	for _, mt := range mediaTypes {
		switch mt {

		case "application/json":
			result["application/json"] = o.JSONProducer

		}

		if p, ok := o.customProducers[mt]; ok {
			result[mt] = p
		}
	}
	return result

}

// HandlerFor gets a http.Handler for the provided operation method and path
func (o *ItStoneAPI) HandlerFor(method, path string) (http.Handler, bool) {
	if o.handlers == nil {
		return nil, false
	}
	um := strings.ToUpper(method)
	if _, ok := o.handlers[um]; !ok {
		return nil, false
	}
	if path == "/" {
		path = ""
	}
	h, ok := o.handlers[um][path]
	return h, ok
}

// Context returns the middleware context for the it stone API
func (o *ItStoneAPI) Context() *middleware.Context {
	if o.context == nil {
		o.context = middleware.NewRoutableContext(o.spec, o, nil)
	}

	return o.context
}

func (o *ItStoneAPI) initHandlerCache() {
	o.Context() // don't care about the result, just that the initialization happened

	if o.handlers == nil {
		o.handlers = make(map[string]map[string]http.Handler)
	}

	if o.handlers["POST"] == nil {
		o.handlers["POST"] = make(map[string]http.Handler)
	}
	o.handlers["POST"]["/v0/cards"] = card.NewCreateCard(o.context, o.CardCreateCardHandler)

	if o.handlers["DELETE"] == nil {
		o.handlers["DELETE"] = make(map[string]http.Handler)
	}
	o.handlers["DELETE"]["/v0/cards/{id}"] = card.NewDeleteCard(o.context, o.CardDeleteCardHandler)

	if o.handlers["DELETE"] == nil {
		o.handlers["DELETE"] = make(map[string]http.Handler)
	}
	o.handlers["DELETE"]["/v0/users/{id}"] = user.NewDeleteUser(o.context, o.UserDeleteUserHandler)

	if o.handlers["GET"] == nil {
		o.handlers["GET"] = make(map[string]http.Handler)
	}
	o.handlers["GET"]["/v0/cards/{id}"] = card.NewGetCard(o.context, o.CardGetCardHandler)

	if o.handlers["GET"] == nil {
		o.handlers["GET"] = make(map[string]http.Handler)
	}
	o.handlers["GET"]["/v0/cards"] = card.NewGetCards(o.context, o.CardGetCardsHandler)

	if o.handlers["GET"] == nil {
		o.handlers["GET"] = make(map[string]http.Handler)
	}
	o.handlers["GET"]["/v0/users/{id}"] = user.NewGetUser(o.context, o.UserGetUserHandler)

	if o.handlers["GET"] == nil {
		o.handlers["GET"] = make(map[string]http.Handler)
	}
	o.handlers["GET"]["/v0/user"] = user.NewGetUserByToken(o.context, o.UserGetUserByTokenHandler)

	if o.handlers["GET"] == nil {
		o.handlers["GET"] = make(map[string]http.Handler)
	}
	o.handlers["GET"]["/v0/users"] = user.NewGetUsers(o.context, o.UserGetUsersHandler)

	if o.handlers["POST"] == nil {
		o.handlers["POST"] = make(map[string]http.Handler)
	}
	o.handlers["POST"]["/v0/login"] = login.NewLogin(o.context, o.LoginLoginHandler)

	if o.handlers["POST"] == nil {
		o.handlers["POST"] = make(map[string]http.Handler)
	}
	o.handlers["POST"]["/v0/registration"] = registration.NewRegistration(o.context, o.RegistrationRegistrationHandler)

	if o.handlers["POST"] == nil {
		o.handlers["POST"] = make(map[string]http.Handler)
	}
	o.handlers["POST"]["/v0/cards/{id}"] = card.NewUpdateCard(o.context, o.CardUpdateCardHandler)

	if o.handlers["POST"] == nil {
		o.handlers["POST"] = make(map[string]http.Handler)
	}
	o.handlers["POST"]["/v0/users/{id}"] = user.NewUpdateUser(o.context, o.UserUpdateUserHandler)

}

// Serve creates a http handler to serve the API over HTTP
// can be used directly in http.ListenAndServe(":8000", api.Serve(nil))
func (o *ItStoneAPI) Serve(builder middleware.Builder) http.Handler {
	o.Init()

	if o.Middleware != nil {
		return o.Middleware(builder)
	}
	return o.context.APIHandler(builder)
}

// Init allows you to just initialize the handler cache, you can then recompose the middleware as you see fit
func (o *ItStoneAPI) Init() {
	if len(o.handlers) == 0 {
		o.initHandlerCache()
	}
}

// RegisterConsumer allows you to add (or override) a consumer for a media type.
func (o *ItStoneAPI) RegisterConsumer(mediaType string, consumer runtime.Consumer) {
	o.customConsumers[mediaType] = consumer
}

// RegisterProducer allows you to add (or override) a producer for a media type.
func (o *ItStoneAPI) RegisterProducer(mediaType string, producer runtime.Producer) {
	o.customProducers[mediaType] = producer
}
