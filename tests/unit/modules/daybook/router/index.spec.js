import router from "@/modules/daybook/router";

describe("Pruebas en daybook router module", () => {
  test("el router debe de tener esta configuracion", () => {
    expect(router).toMatchObject({
      name: "daybook",
      component: expect.any(Function),
      children: [
        /* Children views */
        {
          path: "",
          name: "no-entry",
          component: expect.any(Function),
        },
        {
          path: ":id",
          name: "entry",
          component: expect.any(Function),
          props: expect.any(Function),
        },
      ],
    });
  });
});

/* 
  {
      name: 'daybook',
      component: [Function: component],
      children: [
        { path: '', name: 'no-entry', component: [Function: component] },      
        {
          path: ':id',
          name: 'entry',
          component: [Function: component],
          props: [Function: props]
        }
      ]
    }
*/
