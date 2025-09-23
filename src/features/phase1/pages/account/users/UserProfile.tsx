import { Button } from '@/shared/components/buttons';
import { authService } from '@/shared/services/auth';
import { Avatar, Card, CardBody, CardHeader, Input } from '@heroui/react';
import { Building2, Calendar, Edit, Mail, MapPin, Phone, Save, User, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UrlGenerator } from '../../../../../shared/services/urls/urlGenerator';
import { User as UserType } from '../../../../../shared/types';

const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    company: '',
    bio: '',
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const authResult = await authService.checkAuth();
      if (authResult.isAuthenticated && authResult.user) {
        setUser(authResult.user);
        setProfileData({
          name: authResult.user.name || '',
          email: authResult.user.email || '',
          phone: authResult.user.phone || '',
          location: authResult.user.location || '',
          company: authResult.user.company || '',
          bio: authResult.user.bio || '',
        });
      } else {
        navigate(UrlGenerator.login());
      }
    } catch (_error) {
      // logger.error('Failed to load user data:', error);
      navigate(UrlGenerator.login());
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // TODO: Implement profile update API call
      // await AuthenticationService.updateProfile(profileData);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setEditing(false);
      // Show success message
      // logger.info('Profile updated successfully');
    } catch (_error) {
      // logger.error('Failed to update profile:', error);
      // Show error message
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        location: user.location || '',
        company: user.company || '',
        bio: user.bio || '',
      });
    }
    setEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">User Profile</h1>
          <p className="text-gray-600 mt-2">Manage your personal information and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <div className="lg:col-span-1">
            <Card className="border border-gray-200 shadow-sm">
              <CardBody className="p-6 text-center">
                <Avatar
                  src={user.avatar || undefined}
                  name={user.name || user.email}
                  className="w-24 h-24 mx-auto mb-4 text-2xl"
                />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{user.name || 'User'}</h2>
                <p className="text-gray-600 mb-4">{user.email}</p>

                <div className="space-y-2 text-sm text-gray-600">
                  {user.role && (
                    <div className="flex items-center justify-center">
                      <Building2 className="w-4 h-4 mr-2" />
                      <span className="capitalize">{user.role}</span>
                    </div>
                  )}
                  {user.created_at && (
                    <div className="flex items-center justify-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>Member since {new Date(user.created_at).getFullYear()}</span>
                    </div>
                  )}
                </div>

                <Button
                  className="w-full mt-6"
                  variant="primary"
                  onPress={() => setEditing(true)}
                  startContent={<Edit className="w-4 h-4" />}
                >
                  Edit Profile
                </Button>
              </CardBody>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2">
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between w-full">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
                    <p className="text-gray-600 text-sm">Update your personal details</p>
                  </div>
                  {editing && (
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="tertiary"
                        onPress={handleCancel}
                        startContent={<X className="w-4 h-4" />}
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        variant="primary"
                        onPress={handleSave}
                        isLoading={saving}
                        startContent={!saving && <Save className="w-4 h-4" />}
                      >
                        {saving ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardBody className="pt-0">
                <div className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    {editing ? (
                      <Input
                        value={profileData.name}
                        onChange={e => handleInputChange('name', e.target.value)}
                        placeholder="Enter your full name"
                        startContent={<User className="w-4 h-4 text-gray-400" />}
                      />
                    ) : (
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <User className="w-4 h-4 text-gray-400 mr-3" />
                        <span className="text-gray-900">{profileData.name || 'Not provided'}</span>
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <Mail className="w-4 h-4 text-gray-400 mr-3" />
                      <span className="text-gray-900">{profileData.email}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    {editing ? (
                      <Input
                        value={profileData.phone}
                        onChange={e => handleInputChange('phone', e.target.value)}
                        placeholder="Enter your phone number"
                        startContent={<Phone className="w-4 h-4 text-gray-400" />}
                      />
                    ) : (
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <Phone className="w-4 h-4 text-gray-400 mr-3" />
                        <span className="text-gray-900">{profileData.phone || 'Not provided'}</span>
                      </div>
                    )}
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    {editing ? (
                      <Input
                        value={profileData.location}
                        onChange={e => handleInputChange('location', e.target.value)}
                        placeholder="Enter your location"
                        startContent={<MapPin className="w-4 h-4 text-gray-400" />}
                      />
                    ) : (
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <MapPin className="w-4 h-4 text-gray-400 mr-3" />
                        <span className="text-gray-900">
                          {profileData.location || 'Not provided'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                    {editing ? (
                      <Input
                        value={profileData.company}
                        onChange={e => handleInputChange('company', e.target.value)}
                        placeholder="Enter your company name"
                        startContent={<Building2 className="w-4 h-4 text-gray-400" />}
                      />
                    ) : (
                      <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                        <Building2 className="w-4 h-4 text-gray-400 mr-3" />
                        <span className="text-gray-900">
                          {profileData.company || 'Not provided'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Bio */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                    {editing ? (
                      <textarea
                        value={profileData.bio}
                        onChange={e => handleInputChange('bio', e.target.value)}
                        placeholder="Tell us about yourself..."
                        rows={4}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-900">
                          {profileData.bio || 'No bio provided'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
