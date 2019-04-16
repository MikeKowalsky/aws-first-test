const getUsers = async () => {
  try {
    const response = await fetch("/users/");
    const data = await response.json();
    buildTable(data);
  } catch (err) {
    console.log(err);
  }
};

const buildTable = users => {
  const div = document.querySelector("#emptyDiv");

  let template = "";
  users.forEach(user => {
    template += `
      <tr>  
        <td>${user.name}</td>
        <td>${user.email}</td>
      </tr>
    `;
  });

  div.innerHTML = `
    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>E-mail</th>
        </tr>
      </thead>
      <tbody>
        ${template}
      </tbody>
    </table>
  `;
};
