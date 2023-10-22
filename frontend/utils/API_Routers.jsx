export const BaseURL = 'http://localhost:8000/api/v1'


// authentification urls
export const LoginURL = BaseURL + '/auth/login'


// user urls
export const UserListURL = BaseURL + '/user/all'
export const UserCreateURL = BaseURL + '/user/create'
export const EditUserUrl = BaseURL + '/user/update/'
export const DeleteUserUrl = BaseURL + '/user/delete/'


//medicine urls
export const MedicineURL = BaseURL + '/med/'
export const GroupURL = MedicineURL + 'groups'

export const SalesURL = BaseURL + '/sales/'