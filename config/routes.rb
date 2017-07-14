Rails.application.routes.draw do

  get 'messages/new'

  get 'messages/create'

  ActiveAdmin.routes(self)
  resources :forecasts

  get 'pages/dashboard'

  get 'payments/new'

  get 'orders/show'

  get 'pages/ulm'

  get 'pages/subscribe'

  get 'pages/politique'

  devise_for :users, :controllers => { registrations: 'users/registrations', omniauth_callbacks: 'users/omniauth_callbacks' }

  resources :orders, only: [:show, :create] do
    resources :payments, only: [:new, :create]
  end

  resources :conversations, only: [:index, :show, :destroy] do
    member do
      post :reply
      post :restore
      post :mark_as_read
    end
     collection do
    delete :empty_trash
  end
  end
  resources :messages, only: [:new, :create]


  resources :ads  do
    member do
      get :booked
      get :unbooked
      get :forecast
    end
    collection do
      get 'search', to: "ads#search"    # collection => no ads id in URL
    end
  end


resources :articles, only: [:index, :show, :new, :create, :edit, :update, :destroy] do
  resources :posts, only: [:create]
end


  resources :users, only: [:index, :show, :new, :create, :edit, :update] do
    member do
      get :user_ads
      get :chat_user
    end
    end

  resources :users, only: [:index]

  # authenticated :user do
  #   root :to => 'articles#index', as: :authenticated_root
  # end
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
