class ProductDetailRequests extends HTMLElement {
  constructor() {
    super();
    this.apiUrl = this.parentElement.getAttribute('data-api-url');
    this.iconLink = this.querySelector('a');
    this.apiMethod = this.iconLink.getAttribute('data-request-method');
    this.iconLink.addEventListener('click', this.handleIconClick.bind(this));
  }

  handleIconClick() {
    if (!this.iconLink.classList.contains('clicked')) {
        const dataRequestId = this.iconLink.getAttribute('data-request-id');
        const dataProductId = this.iconLink.getAttribute('data-product-id');

      fetch(
        this.apiMethod === "GET" || this.apiMethod === "POST" ? this.apiUrl : this.apiUrl + dataProductId,
        {
          method: this.apiMethod,
          headers: {
            'Content-Type': 'application/json',
          },
          ...(this.apiMethod !== "GET") && {body: JSON.stringify({
            iconId: dataRequestId,
          })},
        }
      ).then((response) => response.json())
        .then((json) => {
          console.log(json);
          this.iconLink.classList.add('clicked');
          const requestTxtFinish = this.querySelector('p.request-finish-txt');
          requestTxtFinish.classList.add('active');
          setTimeout(function () {
            requestTxtFinish.classList.remove('active');
          }, 1500);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }
}

customElements.define('product-detail-request', ProductDetailRequests);
