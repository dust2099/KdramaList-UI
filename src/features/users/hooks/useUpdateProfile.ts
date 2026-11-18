import { useState } from "react";
import  { userApi }  from "../api/userApi";
import  type { UpdateUserPayload, User } from "../types/userTypes";

export function useUpdateProfile() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const updateProfile = async (id: number, payload: UpdateUserPayload): Promise<User | null> => {
        setIsLoading(true)
        setError(null)
        try {
            const updatedUser = await userApi.updateUser(id, payload)
            return updatedUser
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong')
            return null
        } finally {
            setIsLoading(false)
        }
    }

    return { updateProfile, isLoading, error }
}