import React from "react";

export default function MyService() {
  return 
<div>
<div>this is my service component</div>
      <div className="col mx-auto">
        <div className="bg-white shadow rounded overflow-hidden">
          <h3 className="p-3"> {service.servicename}</h3>
          <div className="container service-container mb-5">
            <div className="row">
              <div className="col-md-3 ads back-container-service">
                <h1 className="col-3">
                  <span id="fl">Request</span>
                  <span id="sl">Service</span>
                </h1>
                <form>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <label
                        className="input-group-text "
                        htmlFor="inputGroupSelect02"
                      >
                        Date
                      </label>
                    </div>
                    <input
                      type="date"
                      id="inputGroupSelect02"
                      className="form-control"
                      name="serviceDate"
                      value={newRequest.serviceDate}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <label
                        className="input-group-text "
                        htmlFor="inputGroupSelect03"
                      >
                        Time
                      </label>
                    </div>
                    <input
                      type="time"
                      id="inputGroupSelect03"
                      className="form-control"
                      name="serviceTime"
                      value={newRequest.serviceTime}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <label
                        className="input-group-text"
                        htmlFor="inputGroupSelect01"
                      >
                        Hours
                      </label>
                    </div>
                    <input
                      type="text"
                      id="inputGroupSelect01"
                      className="form-control"
                      name="amount"
                      placeholder="For how many hours?"
                      value={newRequest.amount}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <label
                        className="input-group-text"
                        htmlFor="inputGroupSelect01"
                      >
                        Hello!
                      </label>
                    </div>
                    <input
                      type="text"
                      id="inputGroupSelect01"
                      className="form-control"
                      placeholder="Say something :)"
                      name="storage"
                      value={newRequest.storage}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <button
                      type="button"
                      className="btn btn-dark  btn-lg btn-block"
                      onClick={sendRequest}
                    >
                      Send Request
                    </button>
                  </div>
                </form>
              </div>
              <div className="col-md-9 service-form">
                <div key={service.id} className="col-3">
                  {/* <div className="card shadow service-card col m-2"> */}
                  <div className="">
                    <h4 className="">{service.servicename}</h4>
                    <h6 className="">Description: {service.description}</h6>
                  </div>
                  <div className="">
                    <h5>{`${service.User.firstname} ${service.User.lastname}`}</h5>
                    {service.User.location}
                  </div>
                  {/* </div> */}
                  <button className="btn btn-sm btn-danger m-2">
                    Chat with {service.User.firstname}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
}
