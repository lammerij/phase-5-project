Rails.application.routes.draw do
  

  resources :causes
  resources :donations
  # resources :users, only: [:update]
  
  
  #auth routes for login/signup
  get '/me', to: "users#show"
  post '/signup', to: "users#create"
  post '/login', to: "sessions#create"
  delete '/logout', to: "sessions#destroy"

  
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  # get '/hello', to: 'application#hello_world'
  # Defines the root path route ("/")
  # root "articles#index"
end
