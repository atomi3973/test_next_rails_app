Rails.application.routes.draw do
  resources :items, only: [:index, :create]
  post 'auth/google', to: 'auth#google'
end
