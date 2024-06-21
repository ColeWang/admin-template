import { mount } from '@vue/test-utils'
import { describe } from 'vitest'
import { BaseForm, DrawerForm, Field, Form, ModalForm, QueryFilter, Submitter } from '../index'
import mountTest from '../../../../tests/shared/mountTest'

describe('Form', () => {
    mount(BaseForm)
    mount(Submitter)
    mount(Field)
    // --
    mountTest(Form)
    mountTest(Form.Item)
    mountTest(Form.Group)
    mountTest(Form.Dependency)
    mountTest(QueryFilter)
    mountTest(ModalForm)
    mountTest(DrawerForm)
})