import React, { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ToggleSwitch from '../../components/property_owner/ToggleSwitch'
import { assets } from '../../../constants'
import { MdOutlineEdit } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"
import { FaShare } from "react-icons/fa"
import { IoMdArrowBack } from "react-icons/io"
import Loader from '../../components/Loader'
import { propertyApi } from '../../api/property'
import { useSelector } from 'react-redux'

const statusColors = {
    available: "bg-green-200/70 text-green-700",
    unavailable: "bg-red-200/70 text-red-700",
    pending: "bg-yellow-200/70 text-yellow-700"
}

const dotColors = {
    available: "bg-green-700",
    unavailable: "bg-red-700",
    pending: "bg-yellow-600"
}

const PropertyOwnerManage = () => {
    const [search, setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [sortKey, setSortKey] = useState("title")
    const [sortAsc, setSortAsc] = useState(true)
    const [selectedIds, setSelectedIds] = useState([])
    const [pageSize, setPageSize] = useState(5)
    const [properties, setProperties] = useState([])
    const [loading, setLoading] = useState(true)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [propertyToDelete, setPropertyToDelete] = useState(null)
    const [deleting, setDeleting] = useState(false)
    const user = useSelector((state) => state.auth.user);

    // Share modal states
    const [showShareModal, setShowShareModal] = useState(false)
    const [propertyToShare, setPropertyToShare] = useState(null)
    const [shareSuccess, setShareSuccess] = useState(null)
    
    useEffect(() => {
        fetchProperties()
    }, [])

    const fetchProperties = async () => {
        try {
            setLoading(true)
            const response = await propertyApi.list({ 
                page: currentPage,
                pageSize: pageSize
            })
            setProperties(response?.properties || [])
        } catch (error) {
            console.error("Failed to fetch properties:", error)
        } finally {
            setLoading(false)
        }
    }

    // Open delete confirmation modal
    const openDeleteModal = (property) => {
        setPropertyToDelete(property)
        setShowDeleteModal(true)
    }

    // Close delete modal
    const closeDeleteModal = () => {
        setShowDeleteModal(false)
        setPropertyToDelete(null)
    }

    // Handle property deletion
    const handleDeleteProperty = async () => {
        if (!propertyToDelete) return
        
        try {
            setDeleting(true)
            await propertyApi.delete(propertyToDelete._id)
            
            // Refresh properties list after successful deletion
            await fetchProperties()
            
            // Close modal and reset state
            closeDeleteModal()
        } catch (error) {
            console.error("Failed to delete property:", error)
        } finally {
            setDeleting(false)
        }
    }

    // Open share modal
    const openShareModal = (property) => {
        setPropertyToShare(property)
        setShowShareModal(true)
        setShareSuccess(null)
    }

    // Close share modal
    const closeShareModal = () => {
        setShowShareModal(false)
        setPropertyToShare(null)
        setShareSuccess(null)
    }

    // Handle sharing to a platform
    const handleShare = (platform) => {
        // In a real app, this would implement actual sharing functionality
        // For now, we'll simulate successful sharing
        setShareSuccess(platform)
        
        // Clear the success message after 3 seconds
        setTimeout(() => {
            setShareSuccess(null)
        }, 3000)
    }

    const filteredData = useMemo(() => {
        return properties.filter(item =>
            item.title?.toLowerCase().includes(search.toLowerCase()) ||
            item.location?.address?.toLowerCase().includes(search.toLowerCase())
        )
    }, [search, properties])

    const sortedData = useMemo(() => {
        const sorted = [...filteredData].sort((a, b) => {
            if (a[sortKey] < b[sortKey]) return sortAsc ? -1 : 1
            if (a[sortKey] > b[sortKey]) return sortAsc ? 1 : -1
            return 0
        })
        return sorted
    }, [filteredData, sortKey, sortAsc])

    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * pageSize
        return sortedData.slice(start, start + pageSize)
    }, [sortedData, currentPage, pageSize])

    const totalPages = Math.ceil(filteredData.length / pageSize)

    const toggleSort = (key) => {
        if (sortKey === key) {
            setSortAsc(!sortAsc)
        } else {
            setSortKey(key)
            setSortAsc(true)
        }
    }

    const toggleSelectAll = (e) => {
        const currentPageIds = paginatedData.map(item => item._id)
        if (e.target.checked) {
            setSelectedIds(prev => [...new Set([...prev, ...currentPageIds])])
        } else {
            setSelectedIds(prev => prev.filter(id => !currentPageIds.includes(id)))
        }
    }

    const toggleSelectOne = (id) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        )
    }

    return (
        <section className='w-full relative'>
            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg w-full max-w-md p-6">
                        <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
                        <p className="mb-6">
                            Are you sure you want to delete the property 
                            <span className="font-medium"> "{propertyToDelete?.title}"</span>? 
                            This action cannot be undone.
                        </p>
                        
                        <div className="flex justify-end gap-3">
                            <button 
                                onClick={closeDeleteModal}
                                disabled={deleting}
                                className="btn bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleDeleteProperty}
                                disabled={deleting}
                                className="btn bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg disabled:opacity-50 flex items-center"
                            >
                                {deleting ? (
                                    <>
                                        <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                                        Deleting...
                                    </>
                                ) : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Share Modal */}
            {showShareModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg w-full max-w-md p-6">
                        <h3 className="text-xl font-semibold mb-4">Share Property</h3>
                        <p className="mb-4">Share "{propertyToShare?.title}" on social media:</p>
                        
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <button 
                                onClick={() => handleShare('Facebook')}
                                className="btn bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg flex items-center justify-center gap-2"
                            >
                                <img 
                                    src="https://cdn-icons-png.flaticon.com/512/124/124010.png" 
                                    className="w-6 h-6 text-white" 
                                    alt="Facebook" 
                                />
                                Facebook
                            </button>
                            <button 
                                onClick={() => handleShare('Twitter')}
                                className="btn bg-blue-400 hover:bg-blue-500 text-white p-3 rounded-lg flex items-center justify-center gap-2"
                            >
                                <img 
                                    src="https://cdn-icons-png.flaticon.com/512/124/124021.png" 
                                    className="w-6 h-6" 
                                    alt="Twitter" 
                                />
                                Twitter
                            </button>
                            <button 
                                onClick={() => handleShare('LinkedIn')}
                                className="btn bg-blue-800 hover:bg-blue-900 text-white p-3 rounded-lg flex items-center justify-center gap-2"
                            >
                                <img 
                                    src="https://cdn-icons-png.flaticon.com/512/124/124011.png" 
                                    className="w-6 h-6" 
                                    alt="LinkedIn" 
                                />
                                LinkedIn
                            </button>
                            <button 
                                onClick={() => handleShare('WhatsApp')}
                                className="btn bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg flex items-center justify-center gap-2"
                            >
                                <img 
                                    src="https://cdn-icons-png.flaticon.com/512/124/124034.png" 
                                    className="w-6 h-6" 
                                    alt="WhatsApp" 
                                />
                                WhatsApp
                            </button>
                        </div>
                        
                        {shareSuccess && (
                            <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4">
                                Success! Your post has been shared on {shareSuccess}.
                            </div>
                        )}
                        
                        <div className="flex justify-end">
                            <button 
                                onClick={closeShareModal}
                                className="btn bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className='w-full bg-white rounded-lg p-4'>
                {/* Top Controls */}
                <div className='flex items-center justify-between'>
                  <div className="flex items-center gap-4">
  {user?.role === 'property_owner' && (
    <>
      <button className="btn !text-sm">Bulk Edit</button>
    </>
  )}
      <ToggleSwitch />

</div>

               <div className='flex items-center gap-4'>
  {user?.role === 'property_owner' && (
    <>
      <Link to="/manage/room/add" className="btn text-sm">Add Room</Link>
      <Link to="/manage/property/add" className="btn text-sm">Add Property</Link>
    </>
  )}
  
  <input
    type="text"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className='text-sm border border-zinc-200 min-w-[300px] rounded-lg p-3'
    placeholder='Search'
  />
</div>

                </div>

                {/* Table */}
                <div className='w-full mt-4 overflow-auto'>
                    <table className='property-table !border-separate w-full'>
                        <thead>
                            <tr>
                                <th><input type="checkbox" onChange={toggleSelectAll} /></th>
                                <th onClick={() => toggleSort("title")} className='cursor-pointer'>Name</th>
                                <th>Status</th>
                                <th onClick={() => toggleSort("size")} className='cursor-pointer'>Size</th>
                                <th>Date Published</th>
                                <th onClick={() => toggleSort("billsIncludedUpTo")} className='cursor-pointer'>Price</th>
                                <th>Listing Id</th>
                                <th onClick={() => toggleSort("location")} className='cursor-pointer'>Location</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map(item => (
                                <tr key={item._id}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.includes(item._id)}
                                            onChange={() => toggleSelectOne(item._id)}
                                        />
                                    </td>
                                    <td>
                                        <Link to={`/manage/property/${item._id}/view`} className='flex items-center gap-2'>
                                            <img 
                                                src={
                                                    item.propertyImages && item.propertyImages.length > 0 
                                                    ? item.propertyImages[0] 
                                                    : assets.placeholder
                                                } 
                                                className='w-[40px] h-[40px] rounded-md object-cover' 
                                                alt={item.title} 
                                            />
                                            <span>{item.title || "Untitled Property"}</span>
                                        </Link>
                                    </td>
                                    <td>
                                        <p className={`w-fit px-3 py-2 rounded-lg flex items-center gap-2 ${statusColors[item.status || "unavailable"]}`}>
                                            <div className={`w-2 h-2 rounded-full ${dotColors[item.status || "unavailable"]}`}></div>
                                            <span className='text-sm capitalize'>{item.status || "unavailable"}</span>
                                        </p>
                                    </td>
                                    <td>{item.size || "N/A"}</td>
                                    <td>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "N/A"}</td>
                                    <td>${item.billsIncludedUpTo || "0"}</td>
                                    <td>{item._id ? item._id.slice(-5) : "N/A"}</td>
                                    <td>{item.location?.address || "Location not specified"}</td>
                                   <td>
  <div className='flex items-center gap-2'>
    {user?.role === 'property_owner' && (
      <>
        <Link 
          to={`/property-owner/manage/property/${item._id}/edit`}
          className="text-gray-600 hover:text-black"
        >
          <MdOutlineEdit className='text-xl' />
        </Link>
        <button 
          className='cursor-pointer text-gray-600 hover:text-red-500'
          onClick={() => openDeleteModal(item)}
        >
          <RiDeleteBin6Line className='text-xl' />
        </button>
      </>
    )}
    {/* Shared button visible to all roles */}
    <button 
      className='cursor-pointer text-gray-600 hover:text-blue-500'
      onClick={() => openShareModal(item)}
    >
      <FaShare className='text-lg' />
    </button>
  </div>
</td>

                                </tr>
                            ))}
                            {paginatedData.length === 0 && (
                                <tr>
                                    <td colSpan="9" className="text-center py-4">No properties found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer Controls */}
                <div className='flex flex-col md:flex-row justify-between items-center gap-4 mt-4'>
                    <p className='text-sm text-zinc-600'>
                        Showing {paginatedData.length} out of {filteredData.length} properties
                    </p>
                    <div className='flex items-center gap-2'>
                        <label htmlFor="limit" className='text-sm'>Rows per page:</label>
                        <select
                            id="limit"
                            value={pageSize}
                            onChange={e => {
                                setPageSize(Number(e.target.value))
                                setCurrentPage(1)
                            }}
                            className='border border-zinc-300 px-2 py-1 rounded-md text-sm'
                        >
                            {[5, 10, 20, 50].map(n => (
                                <option key={n} value={n}>{n}</option>
                            ))}
                        </select>
                    </div>
                    <div className='flex justify-center items-center gap-4'>
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                            className='cursor-pointer flex items-center gap-2 border border-zinc-200 px-4 py-2 rounded-lg disabled:opacity-50'
                        >
                            <IoMdArrowBack className='text-zinc-600' />
                            <span className='text-sm text-zinc-600'>Previous</span>
                        </button>
                        <div className='flex gap-2'>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`btn text-sm ${currentPage === i + 1 ? "bg-black text-white" : ""}`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                            className='cursor-pointer flex items-center gap-2 border border-zinc-200 px-4 py-2 rounded-lg disabled:opacity-50'
                        >
                            <span className='text-sm text-zinc-600'>Next</span>
                            <IoMdArrowBack className='rotate-180 text-zinc-600' />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PropertyOwnerManage