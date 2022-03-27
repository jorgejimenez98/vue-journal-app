import router from "@/modules/daybook/router";

describe("Pruebas en daybook router module", () => {
  test("el router debe de tener esta configuracion", async () => {
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

    // Comprobar que el componente de un hijo es el correcto
    /*     const component = await router.children[0].component();
    expect(component.default.name).toBe("NoEntrySelected");

    const component1 = await router.children[1].component();
    expect(component1.default.name).toBe("EntryView");
 */
    const promisseRoutes = [];
    router.children.forEach((child) => promisseRoutes.push(child.component()));

    const routes = (await Promise.all(promisseRoutes)).map(
      (r) => r.default.name
    );
    expect(routes).toContain("NoEntrySelected");
    expect(routes).toContain("EntryView");
  });

  test("debe de retornar el id de la ruta", () => {
    const route = {
      params: {
        id: "abc-123",
      },
    };

    // expect(router.children[1].props(route)).toEqual({ id: "abc-123" });

    const entryRoute = router.children.find((item) => item.name === "entry");
    expect(entryRoute.props(route)).toEqual({ id: "abc-123" });
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
