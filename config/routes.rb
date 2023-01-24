Rails.application.routes.draw do
  resources :donations
  resources :fundraisers
  resources :causes
  

  # User Routes 
  resources :users
  get "/auth", to: "users#show"
  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  # get '/hello', to: 'application#hello_world'
  # Defines the root path route ("/")
  # root "articles#index"
end
