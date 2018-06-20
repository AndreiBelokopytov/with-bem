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
        <div className={bem('paragraph-1', 'yellow')}>
          Some Text
        </div>
        <div className={bem('paragraph-2', ['green'])}>
          Some Text
        </div>
        <div className={bem('paragraph-3', {blue: true})}>
          Some Text
        </div>
        <div className={bem('paragraph-4', null, 'yellow')}>
          Some Text
        </div>
        <div className={bem('paragraph-5', null, ['green'])}>
          Some Text
        </div>
        <div className={bem('paragraph-6', null, {blue: true})}>
          Some Text
        </div>
      </div>
    );
  }
}

const DummyWrap = withBEM('dummy')(DummyComponent);
const wrapper = Enzyme.shallow(<DummyWrap />);

describe('withBEM', () => {
  it('returns react component', () => {
    expect(wrapper.find(DummyComponent)).to.have.length(1);
  });

  it('generates css class name prefixed with BEM block', () => {
    expect(wrapper.dive().find('.dummy')).to.have.lengthOf(1);
  });

  it('generates css class name with BEM element', () => {
    expect(wrapper.dive().find('div.dummy__title')).to.have.lengthOf(1);
  });

  it('generates css class name postfixed with BEM modifier', () => {
    const wrapper = Enzyme.shallow(<DummyWrap red={true} />);
    expect(wrapper.dive().find('div.dummy')).to.have.className('dummy--background-red');
  });

  it('allows to pass string as BEM modifier', () => {
    expect(wrapper.dive().find('div.dummy__paragraph-1')).to.have.className('dummy__paragraph-1--yellow');
  });

  it('allows to pass array of strings as modifier', () => {
    expect(wrapper.dive().find('div.dummy__paragraph-2')).to.have.className('dummy__paragraph-2--green');
  });

  it('allows to pass PredicateSet as modifier', () => {
    expect(wrapper.dive().find('div.dummy__paragraph-3')).to.have.className('dummy__paragraph-3--blue');
  });

  it('allows to pass string as mixin', () => {
    expect(wrapper.dive().find('div.dummy__paragraph-4')).to.have.className('yellow');
  });

  it('allows to pass array of strings as mixin', () => {
    expect(wrapper.dive().find('div.dummy__paragraph-5')).to.have.className('green');
  });

  it('allows to pass PredicateSet as mixin', () => {
    expect(wrapper.dive().find('div.dummy__paragraph-6')).to.have.className('blue');
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
