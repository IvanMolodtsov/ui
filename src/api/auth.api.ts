import { LoginDto } from "../dto/LoginDto";
import { LoginResponseDto } from "../dto/LoginResponseDto";
import { axiosInstance } from "./axiosInstance";

export const loginRequest = async (dto: LoginDto) => {
  return axiosInstance.post<LoginResponseDto>("/auth/login", dto).then(response => {
    const data = response.data
    if (response.status == 200) {
      localStorage.clear()
      localStorage.setItem("access_token", data.access_token)
      localStorage.setItem("refresh_token", data.refresh_token)
      return true
    } else {
      return false
    }
  })
}