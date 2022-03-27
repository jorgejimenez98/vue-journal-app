import { shallowMount } from "@vue/test-utils";
import Fav from "@/modules/daybook/components/Fab.vue";

describe("Fav.vue", () => {
  let wrapper;
  let wrapperDefault;

  beforeEach(() => {
    wrapperDefault = shallowMount(Fav);
    wrapper = shallowMount(Fav, {
      props: {
        icon: "fa-circle",
      },
    });
  });

  test("Fav should show default icon", () => {
    const itag = wrapperDefault.find('i')
    expect(itag.classes('fa-plus')).toBeTruthy()
  });

  test("Debe mostrar el icono por argumentos: fa-circle", () => {
    const itag = wrapper.find('i')
    expect(itag.classes('fa-circle')).toBeTruthy()
  });

  test("Debe emitit el evento on:clock cuando se hace click", () => {
      wrapper.find('button').trigger('click')
      expect(wrapper.emitted('onClick')).toHaveLength(1)
  });
});
