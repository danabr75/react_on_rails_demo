# frozen_string_literal: true

# NOTES:
# Rails back-end routes will take priority over front-end react routes
# - there should not be any overlap.
# - If would be nice if we could send all JSON format to back-end, and all HTML format to front-end,
# - but rails does not support that ability.

Rails.application.routes.draw do
  devise_for(
    :users,
    controllers: {
      sessions: 'users/sessions',
      registrations: 'users/registrations'
    },
    # path: '',
    # path_names: {
    #   sign_in: 'login',
    #   sign_out: 'logout',
    #   registration: 'signup'
    # }
  )

  # For API Backend
  namespace :api do
    namespace :v1 do
      resources :users
      resources :blogs do
        collection do
          get :meta
        end
      end
      resources :members do
        collection do
          get :public_index
        end
      end
    end
  end

  resources :users
  resources :blogs
  resources :members

  get '/admin_index', to: 'welcome#admin_index', as: :admin_index

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'welcome#index'

  # Needed to exclude the ActiveStorage routes, else intercepted
  constraints(/\/rails\/.*/) do
    # Letting reactJS handle all routes
    get '*path', to: 'welcome#index'
  end

end
