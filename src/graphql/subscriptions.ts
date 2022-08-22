/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateDonationItemPairs = /* GraphQL */ `
  subscription OnCreateDonationItemPairs {
    onCreateDonationItemPairs {
      id
      virtualItemId
      physicalItemId
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateDonationItemPairs = /* GraphQL */ `
  subscription OnUpdateDonationItemPairs {
    onUpdateDonationItemPairs {
      id
      virtualItemId
      physicalItemId
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteDonationItemPairs = /* GraphQL */ `
  subscription OnDeleteDonationItemPairs {
    onDeleteDonationItemPairs {
      id
      virtualItemId
      physicalItemId
      createdAt
      updatedAt
    }
  }
`;
export const onCreateDonorItem = /* GraphQL */ `
  subscription OnCreateDonorItem {
    onCreateDonorItem {
      id
      donorCustomerId
      itemId
      date
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateDonorItem = /* GraphQL */ `
  subscription OnUpdateDonorItem {
    onUpdateDonorItem {
      id
      donorCustomerId
      itemId
      date
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteDonorItem = /* GraphQL */ `
  subscription OnDeleteDonorItem {
    onDeleteDonorItem {
      id
      donorCustomerId
      itemId
      date
      createdAt
      updatedAt
    }
  }
`;
export const onCreateDonationAppointmentProposal = /* GraphQL */ `
  subscription OnCreateDonationAppointmentProposal {
    onCreateDonationAppointmentProposal {
      id
      customerId
      orderId
      serviceId
      appointmentId
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateDonationAppointmentProposal = /* GraphQL */ `
  subscription OnUpdateDonationAppointmentProposal {
    onUpdateDonationAppointmentProposal {
      id
      customerId
      orderId
      serviceId
      appointmentId
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteDonationAppointmentProposal = /* GraphQL */ `
  subscription OnDeleteDonationAppointmentProposal {
    onDeleteDonationAppointmentProposal {
      id
      customerId
      orderId
      serviceId
      appointmentId
      createdAt
      updatedAt
    }
  }
`;
export const onCreateToken = /* GraphQL */ `
  subscription OnCreateToken {
    onCreateToken {
      project {
        id
        name
        userId
        slug
        tokens {
          nextToken
        }
        defaultLocationId
        donationCategoryId
        stockCategoryId
        donorCustomerGroupId
        clientCustomerGroupId
        heroTitle
        description
        createdAt
        updatedAt
      }
      accessToken
      refreshToken
      expiresAt
      merchantId
      type
      id
      createdAt
      updatedAt
      projectTokensId
    }
  }
`;
export const onUpdateToken = /* GraphQL */ `
  subscription OnUpdateToken {
    onUpdateToken {
      project {
        id
        name
        userId
        slug
        tokens {
          nextToken
        }
        defaultLocationId
        donationCategoryId
        stockCategoryId
        donorCustomerGroupId
        clientCustomerGroupId
        heroTitle
        description
        createdAt
        updatedAt
      }
      accessToken
      refreshToken
      expiresAt
      merchantId
      type
      id
      createdAt
      updatedAt
      projectTokensId
    }
  }
`;
export const onDeleteToken = /* GraphQL */ `
  subscription OnDeleteToken {
    onDeleteToken {
      project {
        id
        name
        userId
        slug
        tokens {
          nextToken
        }
        defaultLocationId
        donationCategoryId
        stockCategoryId
        donorCustomerGroupId
        clientCustomerGroupId
        heroTitle
        description
        createdAt
        updatedAt
      }
      accessToken
      refreshToken
      expiresAt
      merchantId
      type
      id
      createdAt
      updatedAt
      projectTokensId
    }
  }
`;
export const onCreateProject = /* GraphQL */ `
  subscription OnCreateProject {
    onCreateProject {
      id
      name
      userId
      slug
      tokens {
        items {
          accessToken
          refreshToken
          expiresAt
          merchantId
          type
          id
          createdAt
          updatedAt
          projectTokensId
        }
        nextToken
      }
      defaultLocationId
      donationCategoryId
      stockCategoryId
      donorCustomerGroupId
      clientCustomerGroupId
      heroTitle
      description
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateProject = /* GraphQL */ `
  subscription OnUpdateProject {
    onUpdateProject {
      id
      name
      userId
      slug
      tokens {
        items {
          accessToken
          refreshToken
          expiresAt
          merchantId
          type
          id
          createdAt
          updatedAt
          projectTokensId
        }
        nextToken
      }
      defaultLocationId
      donationCategoryId
      stockCategoryId
      donorCustomerGroupId
      clientCustomerGroupId
      heroTitle
      description
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteProject = /* GraphQL */ `
  subscription OnDeleteProject {
    onDeleteProject {
      id
      name
      userId
      slug
      tokens {
        items {
          accessToken
          refreshToken
          expiresAt
          merchantId
          type
          id
          createdAt
          updatedAt
          projectTokensId
        }
        nextToken
      }
      defaultLocationId
      donationCategoryId
      stockCategoryId
      donorCustomerGroupId
      clientCustomerGroupId
      heroTitle
      description
      createdAt
      updatedAt
    }
  }
`;
