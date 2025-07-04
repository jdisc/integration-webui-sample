# GraphQL API

Using the GraphQL API, it is possible to extract JDisc Discovery Data. We provide below some example queries to perform this task.

Tip: Use the integrated in our WebUI GraphiQL tool to easily execute queries and explore our API documentation.

## 1. Get the list of all discovered device IDs.

```
query allDevicesIds {
  devices {
    findAll {
      id
    }
  }
}
```


## 2. Get device information.
Here an example query to fetch device information for a list of device IDs. You can modify the query to fetch the needed attributes for your specific use case.

```
query deviceDetailsByIDs {
  devices {
    findByIds(ids: [DEVICEID1, DEVICEID2 ...]) {
      id
      computername
      manufacturer
      model
      type
      serialNumber
      mainIPAddress
      isVirtual
      lastSeenTime
      discoveryTime
      creationTime
      directory {
        id
        name
        canonicalName
        distinguishedName
        guid
        discoveryTime
        netBiosName
        type
      }
      physicalHost {
        id
        computername
        mainIPAddress
        name
      }
      isVirtual
      clusters {
        id
        name
        type
        virtualDatacenter {
          id
          uniqueId
          name
          type
        }
      }
      operatingSystem {
        id
        osFamily
        osVersion
        patchLevel
        licenseType
        licenseStatus
        productKey
        rawVersion
        manufacturer
        systemType
        loggedOnUsersHistory {
          discoveredUserType
          loginCount
          lastLogin
          remoteClientDevice {
            computername
          }
          role
          user {
            id
            name
            surname
            status
            account {
              id
              username
              type
            }
            canonicalName
            cloudType
            distinguishedName
            givenName
            principalName
            lastLogonTime
          }
        }
     
        installedApplications {
         
          installationDate
          installationPath
          source
         
          license {
            id
            productId
            productKey
            status
            type
          }
         
          endOfLifeSupport {
            ltsDate
            lts
            release
            endOfActiveSupport
            endOfSecuritySupport
            extendedEndOfSupport
            latestReleaseDate
            latestVersion
            link
          }
         
          application {
            id
            name
            version
            manufacturer            
          }
        }
      }
      processorSlots {
        id
        slotId
        socketDesignation
        processor {
          id
          manufacturer
          model
          devID
          rawModel
          status
          addressWidth
          currentClockSpeed
          dataWidth
          htEnabled
          l2CacheSize
          l2CacheSpeed
          l3CacheSize
          l3CacheSpeed
          maxClockSpeed
          numberOfThreads
          numberOfEnabledCores
          numberOfECores
          numberOfPCores
        }
      }
      memoryModuleSlots {
        id
        slotId
        socketDesignation
        memoryModule {
          id
          manufacturer
          model
          memoryType
          serialNumber
          size
          speed
        }
      }
      bios {
        id
        name
        manufacturer
        bootMode
        releaseDate
        smbiosMajor
        smbiosMinor
        uefiSecureBoot
        version
        license {
          id
          expirationDate
          productId
          productKey
          status
          type
        }
      }
    }
  }
}

```

## 3. Get user information.
Here an example query to fetch user information You can modify the query to fetch the needed attributes for your specific use case.

```
query userDetails {
  users {
    findAll {
      id
      name
      surname
      givenName
      distinguishedName
      canonicalName
      status
      modificationTime
      lastLogonTime
      cloudType
      directory {
        id
        canonicalName
        name
        netBiosName
        distinguishedName
        guid
        type
      }
      dnsDomain {
        id
        uniqueId
        canonicalName
        name
        netBiosName
        distinguishedName
        guid
        type
      }
    }
  }
}
```
