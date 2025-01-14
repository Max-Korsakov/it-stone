// Code generated by go-swagger; DO NOT EDIT.

package card

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the generate command

import (
	"net/http"

	middleware "github.com/go-openapi/runtime/middleware"

	models "it-stone-server/models"
)

// DeleteCardHandlerFunc turns a function with the right signature into a delete card handler
type DeleteCardHandlerFunc func(DeleteCardParams, *models.Principal) middleware.Responder

// Handle executing the request and returning a response
func (fn DeleteCardHandlerFunc) Handle(params DeleteCardParams, principal *models.Principal) middleware.Responder {
	return fn(params, principal)
}

// DeleteCardHandler interface for that can handle valid delete card params
type DeleteCardHandler interface {
	Handle(DeleteCardParams, *models.Principal) middleware.Responder
}

// NewDeleteCard creates a new http.Handler for the delete card operation
func NewDeleteCard(ctx *middleware.Context, handler DeleteCardHandler) *DeleteCard {
	return &DeleteCard{Context: ctx, Handler: handler}
}

/*DeleteCard swagger:route DELETE /v0/cards/{id} card deleteCard

Delete one card by ID

*/
type DeleteCard struct {
	Context *middleware.Context
	Handler DeleteCardHandler
}

func (o *DeleteCard) ServeHTTP(rw http.ResponseWriter, r *http.Request) {
	route, rCtx, _ := o.Context.RouteInfo(r)
	if rCtx != nil {
		r = rCtx
	}
	var Params = NewDeleteCardParams()

	uprinc, aCtx, err := o.Context.Authorize(r, route)
	if err != nil {
		o.Context.Respond(rw, r, route.Produces, route, err)
		return
	}
	if aCtx != nil {
		r = aCtx
	}
	var principal *models.Principal
	if uprinc != nil {
		principal = uprinc.(*models.Principal) // this is really a models.Principal, I promise
	}

	if err := o.Context.BindValidRequest(r, route, &Params); err != nil { // bind params
		o.Context.Respond(rw, r, route.Produces, route, err)
		return
	}

	res := o.Handler.Handle(Params, principal) // actually handle the request

	o.Context.Respond(rw, r, route.Produces, route, res)

}
