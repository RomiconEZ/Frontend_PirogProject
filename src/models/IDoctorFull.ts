export interface IDoctorFull{
    id: string
    name: string
    surname: string
    patronymic: string
    birthdate: number
    sex: string
    workExperience: number
    region: string // значение из списка
    city: string // значение из списка
    placeOfWork: string // значение из списка
    occupation: string // значение из списка
    email: string
    role: string // значение из списка
}