import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Contact.module.css';
import { renderIcons } from 'utils/renderIcons';
import { iconSize } from 'constants';
import { IconButton } from 'components/IconButton';
import { EditModal } from 'components/EditModal';
import { toast } from 'react-toastify';



export const Contact = ({ contact, onDeleteContact, onChangeContact }) => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isContactEdited, setIsContactEdited] = useState(false);
  
  useEffect(() => {
    console.log(contact.name);
    setName(contact.name)
  }, [contact.name])
  

  useEffect(() => {
    setNumber(contact.number);
  },[contact.number])
  
  
  
  useEffect(() => {
    if (isContactEdited) {
        const edittedContact = {
        name: name,
        number:number
        }
    onChangeContact(edittedContact)
    
      }
     
        
  }, [name, number, isContactEdited, onChangeContact])
  




  // }

  // componentDidUpdate(_, prevState) {
    
  //   if (prevState.isContactEdited !== this.state.isContactEdited) {
  //     const edittedContact = {
  //       name: this.state.name,
  //       number: this.state.number
  //     }
  //         this.props.onChangeContact(edittedContact);
  //   }

  // }

  const toggleModal = () => {
    if (isModalOpen) {
      setIsModalOpen(false);
      // setIsContactEdited(true);
    } else {
      setIsModalOpen(true);
      setIsContactEdited(false);
    }
    // isModalOpen ? this.setState({ isModalOpen: false }) : this.setState({ isModalOpen: true, isContactEdited:false })
  }

  const editContact = ({updatedName, updatedNumber}) => {
     if (updatedName === name && updatedNumber === number) {
        toast.error(`There are no changes. You didn't change neither contact name or phone number`);
        setIsModalOpen(false);
        setIsContactEdited(true);
      //  this.setState({ isModalOpen: false, isContactEdited: true,});
       return;
    } 
        setIsModalOpen(false);
        setName(updatedName);
        setNumber(updatedNumber);
        setIsContactEdited(true);
    
    
    // this.setState({ isModalOpen: false, isContactEdited: true, name: name, number: number });
    
    
  }
 
    console.log('name in CONTACT', name);
    console.log('number in CONTACT', number);
    return (
      <>
        <EditModal
          isOpen={isModalOpen}
          onClose={toggleModal}
          onEditContact={editContact}
          contactName={name}
          contactNumber={number}
        />
          {renderIcons('contact', iconSize.md)}
          <span className={css.contact__name}>{name}: </span>
          <span className={css.contact__number}>{number}</span>
          <IconButton
            onClick={toggleModal}
            aria-label = "Edit Contact"
          >
            {renderIcons('edit', iconSize.sm)}
         </IconButton>
        
          <IconButton
            onClick={() => onDeleteContact(contact.id)}
            aria-label = "Delete contact"
          >
            {renderIcons('delete', iconSize.sm)}
          </IconButton>
      </>
      
    )
}
  

Contact.propTypes = {
      contact: PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
            }).isRequired,
            onDeleteContact: PropTypes.func.isRequired,
            onChangeContact: PropTypes.func.isRequired,
  };  
  