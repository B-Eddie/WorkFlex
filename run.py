from myapp import create_app, db

if __name__ == '__main__':
    app = create_app()
    '''with app.app_context():
        db.drop_all()
        db.create_all()'''
    app.run(host='0.0.0.0', port=5000)
    # host='0.0.0.0'
    '''ports:
    8080
    8000
    3000
    8888
    5000
    '''
