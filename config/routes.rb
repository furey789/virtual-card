Rails.application.routes.draw do
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'welcome#index'
  get 'root', to: 'welcome#get_data'

  resources :card_specs, only: [:new,:show,:edit,:update,:destroy]
  get 'card_specs', to: 'card_specs#get_data'

  post 'card_mailer', to: 'card_mailer#create'

end
