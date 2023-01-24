Rails.application.routes.draw do
  resources :donations
  resources :fundraisers
  resources :causes
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  get '/hello', to: 'application#hello_world'
  # Defines the root path route ("/")
  # root "articles#index"
end
