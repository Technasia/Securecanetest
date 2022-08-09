import React from 'react';
import '../css/main.css';
//import {Link} from "react-router-dom";
//import axios from "axios";
//import $ from 'jquery';
import * as Swal from "sweetalert2";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.addEntourage = this.addEntourage.bind(this);
    this.updateEntourage = this.updateEntourage.bind(this);
    this.state = {
      user: null,
      entourage: {
        name: null,
        phone: null
      },
    }
  }


  async componentDidMount() {
    /*let user = await axios.get("http://localhost:4000/api/users/"+sessionStorage.getItem("id"),
        { headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` } });
    user.data.entourage = JSON.parse(user.data.entourage);
    this.setState({user: user.data});*/
  }

  async addEntourageQuery(){
    /*let userToUpdate = this.state.user;
    userToUpdate.entourage.push(this.state.entourage);
    await axios.post("http://localhost:4000/api/users/entourage/"+sessionStorage.getItem("id"), userToUpdate.entourage);
    this.setState({user: userToUpdate});*/
  }

  async updateEntourageQuery(){
    console.log("TO DO")
  }

  async deleteEntourageQuery(){
    console.log("TO DO")
  }

  async deleteEntourage(name, phone, number) {
    const formValues = await Swal.fire({
      title: 'Supprimer une personne de confiance',
      html:
          `<div class="w-full mx-auto">
          <div class="box bg-white md:px-12 md:py-6 border-t-10 border-solid border-red-600">
              <div class="signup-form mt-6 md:mt-12">
                <div class="border-2 border-solid rounded flex items-center mb-4">
                  <div class="w-10 h-10 flex justify-center items-center flex-shrink-0">
                    <span class="far fa-user text-gray-500"/>
                  </div>
                  <div class="flex-1">
                    <input id="member" name="member" type="text" placeholder="Prénom/Nom" value="` + name + `"
                           class="h-10 py-1 pr-3 w-full outline-none" disabled
                      />
                  </div>
                </div>
          
                <div class="border-2 border-solid rounded flex items-center mb-4">
                  <div class="w-10 h-10 flex justify-center items-center flex-shrink-0">
                    <span class="fas fa-asterisk text-gray-500"/>
                  </div>
                  <div class="flex-1">
                    <input name="phone" id="phone" type="tel" placeholder="Téléphone" value="` + phone + `"
                           class="h-10 py-1 pr-3 w-full outline-none"  disabled />
                  </div>
                </div>
              </div>
             </div>
           </div>`,
      showCloseButton: true,
      focusConfirm: false,
      confirmButtonText:
          'Modifier',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      preConfirm: () => {
        return [
          document.getElementById('member').value,
          document.getElementById('phone').value
        ]
      }
    });
    if (formValues.value) {
      if (formValues.value.length === 2 && this.state.user.entourage.length > number) {
        let {user} = this.state;
        user.entourage.splice(number, 1);
        this.setState(user);
        this.deleteEntourageQuery()
      }
    }
  }

  async updateEntourage(name, phone, number) {
    const formValues = await Swal.fire({
      title: 'Modifier une personne de confiance',
      html:
          `<div class="w-full mx-auto">
          <div class="box bg-white md:px-12 md:py-6 border-t-10 border-solid border-red-600">
              <div class="signup-form mt-6 md:mt-12">
                <div class="border-2 border-solid rounded flex items-center mb-4">
                  <div class="w-10 h-10 flex justify-center items-center flex-shrink-0">
                    <span class="far fa-user text-gray-500"/>
                  </div>
                  <div class="flex-1">
                    <input id="member" name="member" type="text" placeholder="Prénom/Nom" value="` + name + `"
                           class="h-10 py-1 pr-3 w-full outline-none"
                      />
                  </div>
                </div>
          
                <div class="border-2 border-solid rounded flex items-center mb-4">
                  <div class="w-10 h-10 flex justify-center items-center flex-shrink-0">
                    <span class="fas fa-asterisk text-gray-500"/>
                  </div>
                  <div class="flex-1">
                    <input name="phone" id="phone" type="tel" placeholder="Téléphone" value="` + phone + `"
                           class="h-10 py-1 pr-3 w-full outline-none" />
                  </div>
                </div>
              </div>
             </div>
           </div>`,
      showCloseButton: true,
      focusConfirm: false,
      confirmButtonText:
          'Modifier',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      preConfirm: () => {
        return [
          document.getElementById('member').value,
          document.getElementById('phone').value
        ]
      }
    });
    if (formValues.value) {
      if (formValues.value.length === 2 && this.state.user.entourage.length > number) {
        const name = formValues.value[0];
        const phone = formValues.value[1];
        let {user} = this.state;
        user.entourage[number] = {
          "name" : name,
          "phone" : phone
        };
        this.setState(user)
        this.updateEntourageQuery();
      }
    }
  }


  async addEntourage() {
    const formValues = await Swal.fire({
      title: 'ajouter une personne de confiance',
      html:
          `<div class="w-full mx-auto">
          <div class="box bg-white md:px-12 md:py-6 border-t-10 border-solid border-red-600">
    <div class="signup-form mt-6 md:mt-12">
      <div class="border-2 border-solid rounded flex items-center mb-4">
        <div class="w-10 h-10 flex justify-center items-center flex-shrink-0">
          <span class="far fa-user text-gray-500"/>
        </div>
        <div class="flex-1">
          <input id="member" name="member" type="text" placeholder="Prénom/Nom"
                 class="h-10 py-1 pr-3 w-full outline-none"
            />
        </div>
      </div>
      <div class="border-2 border-solid rounded flex items-center mb-4">
        <div class="w-10 h-10 flex justify-center items-center flex-shrink-0">
          <span class="fas fa-asterisk text-gray-500"/>
        </div>
        <div class="flex-1">
          <input name="phone" id="phone" type="tel" placeholder="Téléphone"
                 class="h-10 py-1 pr-3 w-full outline-none" />
        </div>
      </div>
    </div>
    </div>
  </div>`,
      showCloseButton: true,
      focusConfirm: false,
      confirmButtonText:
          'create',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      preConfirm: () => {
        return [
          document.getElementById('member').value,
          document.getElementById('phone').value
        ]
      }
    });
    if (formValues.value) {
      if (formValues.value.length === 2) {
        const name = formValues.value[0];
        const phone = formValues.value[1];
        this.setState({
          entourage: {
            name: name,
            phone: phone
          }
        });
        this.addEntourageQuery()
      }
    }
  }



  render() {
    let {user} = this.state;
    //console.log("USER LOG :", user);

    return(
        <div className="bg-gray-50 flex items-center justify-center py-5">

          <div className="w-full bg-white px-5 md:px-12 py-8 md:py-12 text-gray-800">
            <div className="w-full">
              <div className="text-center max-w-xl mx-auto">
                <h1 className="text-6xl md:text-7xl font-bold mb-5 text-gray-600">Mon entourage</h1>
                <h3 className="text-xl mb-5 font-light">Les personnes à contacter en cas de nécessité.</h3>
                <div className="text-center mb-10">
                  <span className="inline-block w-1 h-1 rounded-full bg-indigo-500 ml-1"/>
                  <span className="inline-block w-3 h-1 rounded-full bg-indigo-500 ml-1"/>
                  <span className="inline-block w-40 h-1 rounded-full bg-indigo-500"/>
                  <span className="inline-block w-3 h-1 rounded-full bg-indigo-500 ml-1"/>
                  <span className="inline-block w-1 h-1 rounded-full bg-indigo-500 ml-1"/>
                </div>
              </div>

              <div className="mx-3 md:flex items-start">
                {user?
                    user.entourage.map((el, index) => {
                      return <div className="px-3 md:w-1/8" key={index}>
                        <div className="w-full h-32 mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6 text-center">
                          <div className="w-full flex mb-4 items-center">
                            <div className="flex-grow pl-3">
                              <h5 className="font-bold text-lg uppercase text-gray-600">{el.name}</h5>
                            </div>
                          </div>
                          <div className="w-full text-center">
                            <p className="text-lg leading-tight">{el.phone}</p>
                          </div>
                          <div className="mb-3">
                            <button className="p-2 lg:px-2 md:mx-2 hover:bg-white hover:text-blue-900 border border-transparent text-center hover:border-blue-900 rounded bg-blue-900 text-white transition-colors duration-300 " onClick={() => {this.updateEntourage(el.name, el.phone, index)}}>Modifier</button>
                            <button className="p-2 lg:px-2 md:mx-2 hover:bg-white hover:text-red-800 border border-transparent text-center hover:border-red-800 rounded bg-red-800 text-white transition-colors duration-300 " onClick={() => {this.deleteEntourage(el.name, el.phone, index)}}>Supprimer</button>
                          </div>
                        </div>
                      </div>
                    })
                    : null
                }

                <div className="px-3 md:w-1/8">
                  <a href="" onClick={this.addEntourage}>
                    <div className="cursor-pointer min-h-full w-full h-32 mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6 text-center">
                      <div className="w-full flex mb-4 items-center">
                        <div className="flex-grow pl-3">
                          <h5 className="font-bold text-sm uppercase text-gray-600">Ajouter <br/>une personne</h5>
                        </div>
                      </div>
                      <div className="w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                      </div>
                    </div>
                  </a>
                </div>

              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default Profile;
