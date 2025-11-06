import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

import type { LoginResponse } from "@/types/auth";

import { client } from "@/helpers/client";

export type LoginParams = {
  userName: string;
  password: string;
};

export async function login(params: LoginParams): Promise<LoginResponse> {
  const url = `/v1/login`;
  const headers = {};
  const response = await client({
    url,
    method: "POST",
    headers,
    data: params,
  });
  return response.data;
}

export function useLogin() {
  return useMutation({
    mutationFn: (params: LoginParams) => login(params),
    retry: 0,
    onSuccess: (data) => {
      localStorage.clear();
      Cookies.set("accessToken", data.token, {
        path: "/",
      });
      window.location.href = "/home";
    },
  });
};
