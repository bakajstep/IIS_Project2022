/**
 @author Adam Kaňkovský
 */

export interface IRoom {
    label: string,
    capacity: number
}
export interface IRoomUpdate {
    id: number,
    label: string,
    capacity: number
}