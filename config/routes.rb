Rails.application.routes.draw do

  resources :forecasts
  get 'conversations/index'

  get 'conversations/create'

  get 'pages/dashboard'

  get 'payments/new'

  get 'orders/show'

  get 'pages/ulm'

  get 'pages/subscribe'

  devise_for :users, :controllers => { registrations: 'users/registrations', omniauth_callbacks: 'users/omniauth_callbacks' }

  resources :orders, only: [:show, :create] do
    resources :payments, only: [:new, :create]
  end


  resources :ads  do
    member do
      get :chat
      get :forecast
    end
    resources :conversations do
      resources :messages
    end
    collection do
      get 'search', to: "ads#search"    # collection => no ads id in URL
    end
  end

resources :conversations do
  resources :messages
  end


resources :articles, only: [:index, :show, :new, :create, :edit, :update, :destroy] do
  resources :posts, only: [:create]
end





  resources :users, only: [:index, :show, :new, :create, :edit, :update, :conversation] do
    member do
      get :user_ads
      get :chat_user
    end
    resources :conversations


    end

  root to: 'pages#home'
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
