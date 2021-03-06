class User {
    BASE_URL = 'https://frebi.willandskill.eu/';
    AUTH_URL = `${this.BASE_URL}api-token-auth/`;
    API_URL = `${this.BASE_URL}api/v1/`;

    JWT_TOKEN = 'JWT_TOKEN';

    getPublicHeaders() {
        return {
            'Content-Type': 'application/json'
        }
    }

    getPrivateHeaders() {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.loadToken()}`
        }
    }

    getUserInformation() {
        return fetch(`${this.API_URL}me`, {
            headers: this.getPrivateHeaders()
        })
    }

    getToken(email, password) {
        return fetch(this.AUTH_URL, {
            method: 'POST',
            headers: this.getPublicHeaders(),
            body: JSON.stringify({email, password})
        });
    }

    saveToken(token) {
        sessionStorage.setItem(this.JWT_TOKEN, token);
    }

    loadToken() {
        return sessionStorage.getItem(this.JWT_TOKEN);
    }

    fetchCustomerData(customerId) {
        const customerUrl = this.API_URL + 'customers/' + customerId + '/'
        return fetch(customerUrl, { headers: this.getPrivateHeaders()})
    }

    fetchCustomerList() {
        return fetch(this.API_URL + 'customers/', {
            headers: this.getPrivateHeaders()
        }).then(res => res.json())
            .then(data => data.results)
    }

    removeToken() {
        sessionStorage.removeItem(this.JWT_TOKEN)
    }
}

export default new User();