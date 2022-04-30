const setupEventListeners = () => {
  const fetchRentGuideBtn = document.querySelector("#get-rent-guide");
  const fetchLetOutGuideBtn = document.querySelector("#get-let-out-guide");
  const mainContent = document.querySelector("#main-content");

  const initialUiBackup = mainContent.innerHTML;

  fetchRentGuideBtn.addEventListener("click", () => {
    mainContent.innerHTML = `
        <article>
        <aside>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="bi bi-arrow-left back-btn-img"
            viewBox="0 0 16 16">
            <path
              fill-rule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
            />
            </svg>
        </aside>
          <header>
            <h2>
              Renting Out Space on
              <img class="inline-icon" src="../media/favicon.png" />
            </h2>
          </header>
          <main class="guide-steps">
            <p>
              Step 1. Make sure you're signed in. If you're not, please ensure that
              you're before getting started with this guide.
            </p>
            <p>
              Step 2. Enter your city in the search bar on the homepage.<br />(Just
              type in the initial letters of your city and the app should
              auto-suggest it in most cases)
            </p>
            <img src="../media/city-searching-demo.png" alt="" />
            <p>Once done, SpaceRental will display all the listings in that city</p>
            <img src="../media/renting-demo.png" alt="" />
            <p>
              Step 3. Go ahead and apply any filters you'd like, to get a listing
              suited to your needs.
            </p>
            <img src="../media/filtered-rental-listings.png" alt="" />
            <p>Step 4. Click on a suitable listing to get additional details.</p>
            <img src="../media/expanded-rental-listings.png" alt="" />
            <p>
              Step 5. Click on <code>Request Owner</code> from here to contact
              rental's owner.
            </p>
          </main>
        </article>
        `;
    addBackBtn();
  });

  fetchLetOutGuideBtn.addEventListener("click", () => {
    mainContent.innerHTML = `
        <article>
        <aside>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="bi bi-arrow-left back-btn-img"
            viewBox="0 0 16 16">
            <path
              fill-rule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
            />
            </svg>
        </aside>
        <header>
          <h2>
            Letting Out Space on
            <img class="inline-icon" src="../media/favicon.png" />
          </h2>
        </header>
        <main class="guide-steps">
          <p>
            Step 1. Make sure you're signed in. If you're not, please ensure that
            you're before getting started with this guide.
          </p>
          <p>
            Step 2. Go to <code>Rent</code> option on the navbar. It will take you
            to a 3-part form wherein you're supposed to enter various property
            details which are essential for your listing to be diplayed on our
            app.
          </p>
          <img class="guide-image" src="../media/letting-out-demo-1.png" alt="" />
          <p>
            Hit <code>Continue</code> to move to the next section of the form.<br />(You
            can also move to the previous section of the form using the back
            button found just below <code>Continue</code> button.)
          </p>
          <img class="guide-image" src="../media/letting-out-demo-2.png" alt="" />
          <img class="guide-image" src="../media/letting-out-demo-3.png" alt="" />
          <p>
            Step 3. Once the form is submitted, SpaceRental will display your
            listing on the
            <code>Buy</code> page along with other listings.
          </p>
          <img
            class="guide-image"
            src="../media/newly-added-listing-demo.png"
            alt=""
          />
        </main>
      </article>`;
    addBackBtn();
  });

  const addBackBtn = () => {
    const backBtn = document.querySelector(".back-btn-img");
    backBtn.addEventListener("click", () => {
      mainContent.innerHTML = initialUiBackup;
      setupEventListeners();
    });
  };
};

setupEventListeners();
