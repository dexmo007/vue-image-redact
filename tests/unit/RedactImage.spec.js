import { mount } from '@vue/test-utils';
import RedactImage from '@/components/RedactImage.vue';

describe('RedactImage.vue', () => {
  it('should render correctly', () => {
    const wrapper = mount(RedactImage, {
      propsData: {
        src: '',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
