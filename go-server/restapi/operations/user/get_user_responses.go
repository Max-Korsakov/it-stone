// Code generated by go-swagger; DO NOT EDIT.

package user

// This file was generated by the swagger tool.
// Editing this file might prove futile when you re-run the swagger generate command

import (
	"net/http"

	"github.com/go-openapi/runtime"

	models "it-stone-server/models"
)

// GetUserOKCode is the HTTP code returned for type GetUserOK
const GetUserOKCode int = 200

/*GetUserOK Success

swagger:response getUserOK
*/
type GetUserOK struct {

	/*
	  In: Body
	*/
	Payload *models.User `json:"body,omitempty"`
}

// NewGetUserOK creates GetUserOK with default headers values
func NewGetUserOK() *GetUserOK {

	return &GetUserOK{}
}

// WithPayload adds the payload to the get user o k response
func (o *GetUserOK) WithPayload(payload *models.User) *GetUserOK {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get user o k response
func (o *GetUserOK) SetPayload(payload *models.User) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetUserOK) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(200)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

// GetUserUnauthorizedCode is the HTTP code returned for type GetUserUnauthorized
const GetUserUnauthorizedCode int = 401

/*GetUserUnauthorized Authentication information is missing or invalid

swagger:response getUserUnauthorized
*/
type GetUserUnauthorized struct {
	/*

	 */
	WWWAuthenticate string `json:"WWW_Authenticate"`
}

// NewGetUserUnauthorized creates GetUserUnauthorized with default headers values
func NewGetUserUnauthorized() *GetUserUnauthorized {

	return &GetUserUnauthorized{}
}

// WithWWWAuthenticate adds the wWWAuthenticate to the get user unauthorized response
func (o *GetUserUnauthorized) WithWWWAuthenticate(wWWAuthenticate string) *GetUserUnauthorized {
	o.WWWAuthenticate = wWWAuthenticate
	return o
}

// SetWWWAuthenticate sets the wWWAuthenticate to the get user unauthorized response
func (o *GetUserUnauthorized) SetWWWAuthenticate(wWWAuthenticate string) {
	o.WWWAuthenticate = wWWAuthenticate
}

// WriteResponse to the client
func (o *GetUserUnauthorized) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	// response header WWW_Authenticate

	wWWAuthenticate := o.WWWAuthenticate
	if wWWAuthenticate != "" {
		rw.Header().Set("WWW_Authenticate", wWWAuthenticate)
	}

	rw.Header().Del(runtime.HeaderContentType) //Remove Content-Type on empty responses

	rw.WriteHeader(401)
}

// GetUserNotFoundCode is the HTTP code returned for type GetUserNotFound
const GetUserNotFoundCode int = 404

/*GetUserNotFound The user with the specified ID was not found.

swagger:response getUserNotFound
*/
type GetUserNotFound struct {

	/*
	  In: Body
	*/
	Payload *models.Error `json:"body,omitempty"`
}

// NewGetUserNotFound creates GetUserNotFound with default headers values
func NewGetUserNotFound() *GetUserNotFound {

	return &GetUserNotFound{}
}

// WithPayload adds the payload to the get user not found response
func (o *GetUserNotFound) WithPayload(payload *models.Error) *GetUserNotFound {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get user not found response
func (o *GetUserNotFound) SetPayload(payload *models.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetUserNotFound) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(404)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}

/*GetUserDefault Internal server error

swagger:response getUserDefault
*/
type GetUserDefault struct {
	_statusCode int

	/*
	  In: Body
	*/
	Payload *models.Error `json:"body,omitempty"`
}

// NewGetUserDefault creates GetUserDefault with default headers values
func NewGetUserDefault(code int) *GetUserDefault {
	if code <= 0 {
		code = 500
	}

	return &GetUserDefault{
		_statusCode: code,
	}
}

// WithStatusCode adds the status to the get user default response
func (o *GetUserDefault) WithStatusCode(code int) *GetUserDefault {
	o._statusCode = code
	return o
}

// SetStatusCode sets the status to the get user default response
func (o *GetUserDefault) SetStatusCode(code int) {
	o._statusCode = code
}

// WithPayload adds the payload to the get user default response
func (o *GetUserDefault) WithPayload(payload *models.Error) *GetUserDefault {
	o.Payload = payload
	return o
}

// SetPayload sets the payload to the get user default response
func (o *GetUserDefault) SetPayload(payload *models.Error) {
	o.Payload = payload
}

// WriteResponse to the client
func (o *GetUserDefault) WriteResponse(rw http.ResponseWriter, producer runtime.Producer) {

	rw.WriteHeader(o._statusCode)
	if o.Payload != nil {
		payload := o.Payload
		if err := producer.Produce(rw, payload); err != nil {
			panic(err) // let the recovery middleware deal with this
		}
	}
}
