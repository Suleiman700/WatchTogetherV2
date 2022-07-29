import AvatarPicker_C from './AvatarPicker.js'
import Join_C from './Rooms/Join.js';

class PeopleWatching {
    constructor() {
        this._area_id = 'people_watching'
    }

    // Generate list of people watching
    generate_list(people_watching, room_host_name) {
        // Clear list of people watching
        this.clear_list()

        const area = document.getElementById(this._area_id);
        const path = AvatarPicker_C._images_path

        // Check if user is the host of the room
        const user_username = Join_C._username
        let is_host = false
        if (user_username === room_host_name) {
            is_host = true
        }

        // Foreach person
        for (const user of people_watching) {

            const html = `
                <div class="col-xs-12 col-sm-6 col-sm-2 col-md-4 col-lg-3 col-xl-2">
                    <div class="card border-0 shadow-lg pt-5 my-5 position-relative bg-dark" style="border-radius: 25px;">
                        <div class="card-body">
                            <div class="member-profile position-absolute w-100 text-center">
                                <img class="rounded-circle mx-auto d-inline-block shadow-sm" src="${path}${user.avatar}" alt="">
                            </div>
                            <div class="card-text my-1">
                                <h5 class="member-name mb-0 text-center text-danger font-weight-bold">${user.username}</h5>
                                <p class="mb-0 text-center text-success" id="${user.username}_movie_state" style="font-size: .8rem;">Just Joined</p>
                                ${
                                    is_host?
                                        `<div class="dropdown">
                                            <i class="fa fa-gear" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="cursor: pointer;"></i>
                                            <ul class="dropdown-menu text-center">
                                                <li id="${user.username}"><a class="kick-user" href="javascript:void(0)"><i class="fa fa-ban"></i> Kick User</a></li>
                                            </ul>
                                        </div>`:''
                                }
                               
                            </div>
                        </div>
                    </div>
                </div>`


            area.innerHTML += html
        }


    }

    // Clear list of people watching
    clear_list() {
        document.getElementById(this._area_id).innerHTML = ''
    }
}

const PeopleWatching_C = new PeopleWatching()
export default PeopleWatching_C
