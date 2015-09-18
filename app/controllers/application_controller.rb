class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def ensure_login
    unless session[:loggedin] != nil && session[:loggedin] = "yes"
      redirect_to root_path
      flash[:alert]="You must sign in to LinkedIn!"
    end
  end

end
