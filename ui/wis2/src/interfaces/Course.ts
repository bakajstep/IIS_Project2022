export interface ICourse {
    label: string,
    description: string,
    type: string,
    price: number,
    capacity: number,
    autoReg: boolean,
    guarantor: number
}
export interface ICourseModel {
    id: number,
    label: string,
    description: string,
    type: string,
    price: number,
    capacity: number,
    guarantor_id: number
}

export interface ITermModel {
    course_id: number,
    id: number,
    label: string,
    min_points: string,
    max_points: string,
    from_time: number,
    to_time: number,
}

export interface ITerm {
    id: number,
    course_id: number,
    label: string,
    min_points: number,
    max_points: number,
    from_time: number,
    to_time: string,
    room_id: string,
}

export interface ITermCreate {
    course_id: number,
    label: string,
    min_points: number,
    max_points: number,
    from_time: number,
    to_time: string,
    room_id: string,
    date: string
}

export interface IEvent{
    id: string,
    start: Date,
    end: Date,
    title: string,
}

export interface IDate {
    id: number,
    date: string,
}

export interface IDateStud {
    person_id: number,
    name: string,
    surname: string,
    email: string,
    points: number,
}

export interface IActuality {
    id: number,
    description: string,
}