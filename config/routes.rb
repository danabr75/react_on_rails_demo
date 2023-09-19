# frozen_string_literal: true

Rails.application.routes.draw do
  # devise_for :users
  devise_for(
    :users,
    controllers: {
      sessions: 'users/sessions',
      registrations: 'users/registrations'
    },
    path: '',
    path_names: {
      sign_in: 'login',
      sign_out: 'logout',
      registration: 'signup'
    }
  )

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'welcome#index'

  # Letting reactJS handle all routes
  get '*path', to: 'welcome#index'
end
