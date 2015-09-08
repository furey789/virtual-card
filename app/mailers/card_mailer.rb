class CardMailer < ApplicationMailer

  # Default Mail Values
  default from: 'notifications@example.com', to: { User.pluck(:email) }

  def email_mycard(name,url)
    @name = name
    @url  = url
    mail(to: 'prfurey@gmail.com', subject: 'Welcome to My Awesome Site')
  end

end
