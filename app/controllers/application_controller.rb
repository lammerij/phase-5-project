class ApplicationController < ActionController::API
  include ActionController::Cookies
  before_action :authorize

  def authorize
    @current_user = User.find_by(id: session[:user_id])
    render json: { errors: "Not authorized" }, status: :unauthorized unless @current_user
  end

  private

  def find_cause
    Cause.find_by(id: params[:id])
  end
  
end
