Rails.application.routes.draw do
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'welcome#index'

  resources :card_specs, only: [:new,:show,:edit,:update,:destroy]

  post 'card_mailer', to: 'card_mailer#create'

end
