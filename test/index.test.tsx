import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as chai from 'chai';
import * as chaiEnzyme from 'chai-enzyme'
import withBEM, { IBemProps } from '../lib/index';

Enzyme.configure({adapter: new Adapter()});
chai.use(chaiEnzyme());

const expect = chai.expect;

interface IDummyComponentProps {
  red?: boolean;
};

class DummyComponent extends React.Component<IDummyComponentProps & IBemProps> {
  public render() {
    const {
      bem,
      red
    } = this.props;
    return (
      <div className={bem(null, {'background-red': red})}>
        <div className={bem('title')}>
          Title
        </div>
      </div>
    );
  }
}

const DummyWrap = withBEM('dummy')(DummyComponent);

describe('withBEM', () => {
  it('returns react component', () => {
    const wrapper = Enzyme.shallow(<DummyWrap />);
    expect(wrapper.find(DummyComponent)).to.have.length(1);
  });

  it('generates css class name prefixed with BEM block', () => {
    const wrapper = Enzyme.shallow(<DummyWrap />);
    expect(wrapper.dive().find('.dummy')).to.have.lengthOf(1);
  });

  it('generates css class name with BEM element', () => {
    const wrapper = Enzyme.shallow(<DummyWrap />);
    expect(wrapper.dive().find('div.dummy__title')).to.have.lengthOf(1);
  });

  it('generates css class name postfixed with BEM modifier', () => {
    const wrapper = Enzyme.shallow(<DummyWrap red />);
    expect(wrapper.dive().find('div.dummy')).to.have.className('dummy--background-red');
  });

  it('passes arbitrary className prop down to wrapped component', () => {
    const wrapper = Enzyme.shallow(<DummyWrap className={'big'}/>);
    expect(wrapper.dive().find('div.dummy')).to.have.className('big');
  });

  it('allows to change class prefix', () => {
    const DummyWrap = withBEM('dummy', 'c-')(DummyComponent);
    const wrapper = Enzyme.shallow(<DummyWrap />);
    expect(wrapper.dive().find('.c-dummy')).to.have.lengthOf(1);
    expect(wrapper.dive().find('.dummy')).to.have.lengthOf(0);
  });

  it('allows to change modifier delimiter', () => {
    const DummyWrap = withBEM<IDummyComponentProps>('dummy', '', '_')(DummyComponent);
    const wrapper = Enzyme.shallow(<DummyWrap red />);
    expect(wrapper.dive().find('div.dummy')).to.have.className('dummy_background-red');
    expect(wrapper.dive().find('div.dummy')).to.not.have.className('dummy--background-red');
  });
});
