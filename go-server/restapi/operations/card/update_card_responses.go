// Code generated by go-swagger; DO NOT EDIT.

package card

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"net/http"

	"github.com/go-openapi/runtime"

	models "it-stone-server/models"
)

// UpdateCardOKCode is the HTTP code returned for type UpdateCardOK
const UpdateCardOKCode int = 200

/*UpdateCardOK The card has been updated

swagger:response updateCardOK
*/
type UpdateCardOK struct {

	/*
	  In: Body
	*/
	Payload *models.Card `json:"body,omitempty"`
}

// NewUpdateCardOK creates UpdateCardOK with default headers values
func NewUpdateCardOK() *UpdateCardOK {

	return &UpdateCardOK{}
}

// WithPayload adds the payload to the update card o k response
func (o *UpdateCardOK) WithPayload(payload *models.Card) *UpdateCardOK {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the update card o k response
func (o *UpdateCardOK) SetPayload(payload *models.Card) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *UpdateCardOK) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(200)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

// UpdateCardUnauthorizedCode is the HTTP code returned for type UpdateCardUnauthorized
const UpdateCardUnauthorizedCode int = 401

/*UpdateCardUnauthorized Authentication information is missing or invalid

swagger:response updateCardUnauthorized
*/
type UpdateCardUnauthorized struct {
	/*

	 */
	WWWAuthenticate string `json:"WWW_Authenticate"`
}

// NewUpdateCardUnauthorized creates UpdateCardUnauthorized with default headers values
func NewUpdateCardUnauthorized() *UpdateCardUnauthorized {

	return &UpdateCardUnauthorized{}
}

// WithWWWAuthenticate adds the wWWAuthenticate to the update card unauthorized response
func (o *UpdateCardUnauthorized) WithWWWAuthenticate(wWWAuthenticate string) *UpdateCardUnauthorized {
	o.WWWAuthenticate = wWWAuthenticate
	return o
}

// SetWWWAuthenticate sets the wWWAuthenticate to the update card unauthorized response
func (o *UpdateCardUnauthorized) SetWWWAuthenticate(wWWAuthenticate string) {
	o.WWWAuthenticate = wWWAuthenticate
}

// WriteResponse to the client
func (o *UpdateCardUnauthorized) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	// response header WWW_Authenticate

	wWWAuthenticate := o.WWWAuthenticate
	if wWWAuthenticate != "" {
		rw.Header().Set("WWW_Authenticate", wWWAuthenticate)
	}

	rw.Header().Del(runtime.HeaderContentType) //Remove Content-Type on empty responses

	rw.WriteHeader(401)
}

// UpdateCardNotFoundCode is the HTTP code returned for type UpdateCardNotFound
const UpdateCardNotFoundCode int = 404

/*UpdateCardNotFound The card with the specified ID was not found.

swagger:response updateCardNotFound
*/
type UpdateCardNotFound struct {

	/*
	  In: Body
	*/
	Payload *models.Error `json:"body,omitempty"`
}

// NewUpdateCardNotFound creates UpdateCardNotFound with default headers values
func NewUpdateCardNotFound() *UpdateCardNotFound {

	return &UpdateCardNotFound{}
}

// WithPayload adds the payload to the update card not found response
func (o *UpdateCardNotFound) WithPayload(payload *models.Error) *UpdateCardNotFound {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the update card not found response
func (o *UpdateCardNotFound) SetPayload(payload *models.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *UpdateCardNotFound) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(404)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

/*UpdateCardDefault Internal server error

swagger:response updateCardDefault
*/
type UpdateCardDefault struct {
	_statusCode int

	/*
	  In: Body
	*/
	Payload *models.Error `json:"body,omitempty"`
}

// NewUpdateCardDefault creates UpdateCardDefault with default headers values
func NewUpdateCardDefault(code int) *UpdateCardDefault {
	if code <= 0 {
		code = 500
	}

	return &UpdateCardDefault{
		_statusCode: code,
	}
}

// WithStatusCode adds the status to the update card default response
func (o *UpdateCardDefault) WithStatusCode(code int) *UpdateCardDefault {
	o._statusCode = code
	return o
}

// SetStatusCode sets the status to the update card default response
func (o *UpdateCardDefault) SetStatusCode(code int) {
	o._statusCode = code
}

// WithPayload adds the payload to the update card default response
func (o *UpdateCardDefault) WithPayload(payload *models.Error) *UpdateCardDefault {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the update card default response
func (o *UpdateCardDefault) SetPayload(payload *models.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *UpdateCardDefault) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(o._statusCode)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}
