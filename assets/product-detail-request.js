class ProductDetailRequests extends HTMLElement {
  constructor() {
    super();
    this.apiUrl = this.parentElement.getAttribute('data-api-url');
    this.iconLink = this.querySelector('a');
    this.iconLink.addEventListener('click', this.handleIconClick.bind(this));
  }

  handleIconClick() {
    if (!this.iconLink.classList.contains('clicked')) {
      const dataRequestId = this.iconLink.getAttribute('data-request-id');

      fetch(
        this.apiUrl,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            iconId: dataRequestId,
          }),
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
