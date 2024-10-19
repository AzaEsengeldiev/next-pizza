import { api } from '../redux/index'

const extendedApi = api.injectEndpoints({
	endpoints: build => ({
		Registration: build.mutation({
			query: value => ({
				url: 'auth/registration',
				method: 'POST',
				body: value
			}),
			invalidatesTags: ['crud']
		}),
		Login: build.mutation({
			query: value => ({
				url: 'auth/login',
				method: 'POST',
				body: value
			}),
			invalidatesTags: ['crud']
		})
	}),
	overrideExisting: false
})

export const { useRegistrationMutation, useLoginMutation } = extendedApi
